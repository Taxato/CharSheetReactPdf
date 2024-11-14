import { Text, View } from "@react-pdf/renderer";
import type { Spell } from "./api";
import Diamond from "./Diamond";
import { charInfo } from "./charInfo";

export default function SpellList({ spells }: { spells: Spell[] }) {
	return (
		<View>
			<SpellListHeader />

			{spells.map((spell, index) => (
				<SpellItem
					key={index}
					spell={spell}></SpellItem>
			))}
		</View>
	);
}

function SpellListHeader() {
	return (
		<View
			style={{
				fontSize: 8,
				fontWeight: "bold",

				display: "flex",
				flexDirection: "row",
				textAlign: "center",
				borderBottom: "2px solid black",
			}}>
			<Text style={{ width: "10%" }}>Prepared</Text>
			<Text style={{ width: "5%" }}></Text>
			<Text style={{ width: "20%" }}>
				Name <Text style={{ fontStyle: "italic" }}>(School)</Text>
			</Text>
			<Text style={{ width: "15%" }}>Components</Text>
			<Text style={{ width: "10%", textAlign: "left" }}>
				Casting Time
			</Text>
			<Text style={{ width: "10%" }}>Concentration</Text>
			<Text style={{ width: "15%" }}>Duration</Text>
			<Text style={{ width: "10%" }}>Range</Text>
		</View>
	);
}

function SpellItem({ spell }: { spell: Spell }) {
	const materialCost = spell.material?.match(/([\d,]+ ?gp).*?consumes/)?.[1];

	let dmg = "";
	if (spell.level === 0 && spell.damage?.damage_at_character_level) {
		for (const lvl of Object.keys(spell.damage.damage_at_character_level)) {
			if (Number(lvl) <= charInfo.level)
				dmg = `${spell.damage.damage_at_character_level[Number(lvl)]} ${spell.damage.damage_type?.name || "Chosen"} Damage`;
		}
	}
	// 	}
	// } else if (spell.damage?.damage_at_slot_level) {
	// 	dmg = `Slot level: Damage | ${Object.entries(
	// 		spell.damage.damage_at_slot_level,
	// 	)
	// 		.map(([slotLevel, damage]) => {
	// 			return `${slotLevel}: ${damage}`;
	// 		})
	// 		.join(" | ")}`;
	// }
	// if (spell.index === "chromatic-orb") console.log(spell, dmg);

	return (
		<View
			style={{
				borderBottom: "1px solid black",
			}}>
			<View
				style={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					fontSize: 8,
				}}>
				<Text style={{ width: "5%" }}>Lvl: {spell.level || "C"}</Text>
				<View
					style={{
						width: "30%",
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						gap: 2,
					}}>
					<Diamond fill={spell.level === 0} />
					<Text>{spell.name}</Text>
					<Text style={{ fontStyle: "italic", fontSize: 6 }}>
						({spell.school.name})
					</Text>
				</View>
				<Text style={{ width: "15%", textAlign: "center" }}>
					{spell.components.join(", ")}
					{materialCost && (
						<Text style={{ fontStyle: "italic" }}>
							&nbsp;({materialCost})
						</Text>
					)}
				</Text>
				<View
					style={{
						width: "20%",
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
						paddingRight: 20,
					}}>
					<Text>
						{spell.ritual
							? `${spell.casting_time} or ritual`
							: spell.casting_time}
					</Text>
					<Diamond fill={spell.concentration} />
				</View>
				<Text style={{ width: "15%", textAlign: "center" }}>
					{spell.duration}
				</Text>
				<Text style={{ width: "10%", textAlign: "center" }}>
					{spell.range}
				</Text>
			</View>
			<Text style={{ fontSize: 8 }}>
				{spell.shortDesc && spell.shortDesc}
				&nbsp;
				{dmg ? `Damage at current level: ${dmg}` : null}
			</Text>
		</View>
	);
}
