import { PDFViewer } from "@react-pdf/renderer";
import React, { ChangeEvent, useEffect, useState } from "react";
import { getAllSpells, Spell } from "./api";
import SpellSheet from "./SpellSheet";

export default function SelectSpells() {
	const [spells, setSpells] = useState<Spell[]>(() => {
		const storedSpells = localStorage.getItem("spells");
		if (storedSpells) return JSON.parse(storedSpells);
		else return [];
	});

	const [selectedSpellIndeces, setSelectedSpellIndices] = useState<string[]>(
		() => {
			const savedSelectedSpells = localStorage.getItem("selectedSpells");
			if (savedSelectedSpells) return JSON.parse(savedSelectedSpells);
			else return [];
		},
	);
	function handleSelectSpell({ target }: ChangeEvent<HTMLInputElement>) {
		const checked = target.checked;
		if (checked) {
			setSelectedSpellIndices([...selectedSpellIndeces, target.value]);
		} else {
			setSelectedSpellIndices(
				selectedSpellIndeces.filter(spell => spell !== target.value),
			);
		}
	}

	const [selectedSpells, setSelectedSpells] = useState<Spell[]>([]);
	useEffect(() => {
		setSelectedSpells(
			spells.filter(spell => selectedSpellIndeces.includes(spell.index)),
		);
		localStorage.setItem(
			"selectedSpells",
			JSON.stringify(selectedSpellIndeces),
		);
	}, [selectedSpellIndeces]);

	useEffect(() => {
		if (spells.length > 0) return;
		getAllSpells().then(spells => {
			setSpells(spells);
			localStorage.setItem("spells", JSON.stringify(spells));
		});
	}, []);

	let previousLevel = -1;
	return (
		<div className="p-2">
			<ul className="columns-2xs gap-2">
				{spells.map(spell => {
					const showHeader = spell.level > previousLevel;
					previousLevel = spell.level;
					return (
						<React.Fragment key={spell.index}>
							{showHeader && (
								<h1 className="my-2 text-center text-xl font-bold text-white">
									{spell.level > 0
										? `Level ${spell.level}`
										: "Cantrips"}
								</h1>
							)}
							<SpellCard
								spell={spell}
								selectedSpells={selectedSpellIndeces}
								onSelectSpell={handleSelectSpell}
							/>
						</React.Fragment>
					);
				})}
			</ul>

			{/* <div className="my-4 flex justify-center">
				<PDFDownloadLink
					className="rounded-lg bg-white p-4 text-xl font-bold"
					document={<SpellListPdf spells={selectedSpells} />}
					fileName="SpellSheet">
					Create SpellSheet with selected spells
				</PDFDownloadLink>
			</div> */}
			<PDFViewer style={{ height: "100vh", width: "100%" }}>
				<SpellSheet spells={selectedSpells} />
			</PDFViewer>
			<p>Text</p>
		</div>
	);
}

function SpellCard({
	spell,
	selectedSpells,
	onSelectSpell,
}: {
	spell: Spell;
	selectedSpells: string[];
	onSelectSpell: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
	return (
		<li
			key={spell.index}
			className="mb-2 inline-block select-none">
			<input
				id={spell.index}
				type="checkbox"
				className="peer invisible absolute scale-0"
				value={spell.index}
				onChange={onSelectSpell}
				checked={selectedSpells.includes(spell.index)}
			/>
			<label
				htmlFor={spell.index}
				className={`flex w-full flex-col items-center rounded-lg p-1 text-sm font-semibold ${
					spell.level === 0
						? "bg-indigo-200"
						: spell.level === 1
							? "bg-violet-300"
							: spell.level === 2
								? "bg-purple-300"
								: spell.level === 3
									? "bg-fuchsia-300"
									: "bg-pink-300"
				} ${
					spell.level === 0
						? "peer-checked:bg-indigo-300"
						: spell.level === 1
							? "peer-checked:bg-violet-400"
							: spell.level === 2
								? "peer-checked:bg-purple-400"
								: spell.level === 3
									? "peer-checked:bg-fuchsia-400"
									: "peer-checked:bg-pink-400"
				}`}>
				<h2 className="text-base font-semibold">{spell.name}</h2>
				<h3 className="-my-1 text-xs italic">{spell.school.name}</h3>
				<div className="grid w-full grid-cols-2 justify-items-center text-center">
					<span>Level: {spell.level || "Cantrip"}</span>
					<span>{spell.components.join(", ")}</span>
					<span>Range: {spell.range}</span>
					<span>
						Casting time:&nbsp;
						{spell.ritual
							? `${spell.casting_time} or ritual`
							: spell.casting_time}
					</span>
				</div>
				<p className="custom-scrollbar mt-1 text-xs">
					{spell.desc}
					{spell.higher_level.length > 0 && (
						<>
							<br />
							<br />
							{spell.higher_level}
						</>
					)}
				</p>
			</label>
		</li>
	);
}
