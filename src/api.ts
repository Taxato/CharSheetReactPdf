import axios from "axios";

const axiosClient = axios.create({
	baseURL: "https://www.dnd5eapi.co",
});

export async function getAllSpells() {
	const res = await axiosClient.get(
		"/api/spells?level=0&level=1&level=2&level=3&level=4",
	);
	const spells = res.data.results as SpellMini[];

	return (
		await Promise.all(
			spells.map(
				async spell => (await axiosClient.get<Spell>(spell.url)).data,
			),
		)
	)
		.filter(spell => spell.classes.find(c => c.index === "wizard"))
		.sort((a, b) => a.level - b.level);
}

export type Spell = {
	index: string;
	level: number;
	name: string;
	url: string;
	desc: string[];
	higher_level: string[];
	duration: string;
	components: ("V" | "S" | "M")[];
	material?: string;
	area_of_effect?: {
		size: number;
		type: "sphere" | "cone" | "cylinder" | "line" | "cube";
	};
	ritual: boolean;
	concentration: boolean;
	casting_time: string;
	attack_type?: string;
	range: string;
	damage?: {
		damage_at_character_level?: { [level: number]: string };
		damage_at_slot_level?: { [slotLevel: number]: string };
		damage_type: {
			name: string;
		};
	};
	school: {
		index: string;
		name: string;
		level: number;
		url: string;
	};
	classes: {
		index: string;
		name: string;
		level: number;
		url: string;
	}[];
};

export type SpellMini = Pick<Spell, "index" | "name" | "level" | "url">;
