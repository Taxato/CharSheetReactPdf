import axios, { AxiosRequestConfig } from "axios";
import * as cheerio from "cheerio";
import * as cm from "closest-match";
import FormData from "form-data";

const axiosClient = axios.create({
	baseURL: "https://www.dnd5eapi.co",
});

const formData = new FormData();
formData.append("Filtre1[]", "w");
formData.append("nivMin", 0);
formData.append("nivMax", 4);
formData.append("source[]", "base");
formData.append("colE", "on");
formData.append("colI", "on");
formData.append("colC", "on");
formData.append("colR", "on");
formData.append("colD", "on");
formData.append("filtrer", "FILTER");

const config: AxiosRequestConfig = {
	method: "post",
	maxBodyLength: Infinity,
	data: formData,
};

export async function getSpellDescriptions() {
	const { data } = await axios("/api", config);

	const $ = cheerio.load(data);

	const rawList = $("table#liste tbody").children();

	const spells: SpellDescription[] = rawList
		.map((_, row) => {
			const cols = row.children
				.slice(1, -1)
				.map(child => $(child).text().trim());
			return {
				name: cols[0],
				desc: cols[8],
			};
		})
		.get();

	return spells;
}

export type SpellDescription = {
	name: string;
	// level: number;
	// school: string;
	// duration: string;
	// range: string;
	// components: ("V" | "S" | "M")[];
	// concentration: boolean;
	// ritual: boolean;
	desc: string;
};

export async function getAllSpells() {
	const spellDescriptions = await getSpellDescriptions();
	const res = await axiosClient.get(
		"/api/spells?level=0&level=1&level=2&level=3&level=4",
	);
	const rawSpells = res.data.results as SpellMini[];

	const spells = await Promise.all(
		rawSpells.map(
			async spellMini =>
				(await axiosClient.get<Spell>(spellMini.url)).data,
		),
	);
	spells.push(...manualEntries);

	spells.forEach(spell => {
		const shortDesc = spellDescriptions.find(desc => {
			const closestMatch = cm.closestMatch(
				spell.name,
				spellDescriptions.map(d => d.name),
			);
			return desc.name === closestMatch;
		})?.desc;
		if (shortDesc) spell.shortDesc = shortDesc;
		return spell;
	});

	return spells
		.filter(spell => spell.classes.find(c => c.index === "wizard"))
		.sort((a, b) => {
			if (a.level !== b.level) return a.level - b.level;
			else return a.index.localeCompare(b.index);
		});
}

export type Spell = {
	index: string;
	level: number;
	name: string;
	url: string;
	desc: string[];
	shortDesc: string;
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
		damage_type?: {
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

const manualEntries: Spell[] = [
	{
		index: "chromatic-orb",
		level: 1,
		name: "Chromatic Orb",
		url: "/spells/chromatic-orb",
		desc: [
			"You hurl a 4-inch-diameter sphere of energy at a creature that you can see within range. You choose acid, cold, fire, lightning, poison, or thunder for the type of orb you create, and then make a ranged spell attack against the target. If the attack hits, the creature takes 3d8 damage of the type you chose.",
		],
		shortDesc: "",
		higher_level: [],
		duration: "Instantaneous",
		components: ["V", "S", "M"],
		material: "A diamond worth at least 50gp",
		ritual: false,
		concentration: false,
		casting_time: "1 Action",
		attack_type: "ranged",
		range: "90 feet",
		damage: {
			damage_at_slot_level: {
				1: "3d8",
				2: "4d8",
				3: "5d8",
				4: "6d8",
				5: "7d8",
				6: "8d8",
				7: "9d8",
				8: "10d8",
				9: "11d8",
			},
			damage_type: {
				name: "Acid, Cold, Fire, Lightning, Poison, Or Thunder",
			},
		},
		school: {
			index: "evocation",
			level: 1,
			name: "Evocation",
			url: "/schools/evocation",
		},
		classes: [
			{
				index: "wizard",
				level: 1,
				name: "Wizard",
				url: "/classes/wizard",
			},
		],
	},
	{
		index: "cloud-of-daggers",
		level: 2,
		name: "Cloud of Daggers",
		url: "/spells/cloud-of-daggers",
		desc: [
			"You fill the air with spinning daggers in a cube 5 feet on each side, centered on a point you choose within range. A creature takes 4d4 slashing damage when it enters the spell's area for the first time on a turn or starts its turn there.",
		],
		shortDesc: "",
		higher_level: [
			"When you cast this spell using a spell slot of 3rd level or higher, the damage increases by 2d4 for each slot level above 2nd.",
		],
		duration: "Up to 1 minute",
		components: ["V", "S", "M"],
		material: "A sliver of glass",
		ritual: false,
		concentration: true,
		casting_time: "1 Action",
		attack_type: "ranged",
		range: "60 feet",
		damage: {
			damage_at_slot_level: {
				2: "4d4",
				3: "6d4",
				4: "8d4",
				5: "10d4",
				6: "12d4",
				7: "14d4",
				8: "16d4",
				9: "18d4",
			},
			damage_type: {
				name: "Slashing",
			},
		},
		school: {
			index: "conjuration",
			level: 2,
			name: "Conjuration",
			url: "/schools/conjuration",
		},
		classes: [
			{
				index: "wizard",
				level: 2,
				name: "Wizard",
				url: "/classes/wizard",
			},
		],
	},
	{
		index: "witch-bolt",
		level: 1,
		name: "Cloud of Daggers",
		url: "/spells/witch-bolt",
		desc: [
			"A beam of crackling, blue energy lances out toward a creature within range, forming a sustained arc of lightning between you and the target. Make a ranged spell attack against that creature. On a hit, the target takes 1d12 lightning damage, and on each of your turns for the duration, you can use your action to deal 1d12 lightning damage to the target automatically. The spell ends if you use your action to do anything else. The spell also ends if the target is ever outside the spell's range or if it has total cover from you.",
		],
		shortDesc: "",
		higher_level: [
			"When you cast this spell using a spell slot of 2nd level or higher, the initial damage increases by 1d12 for each slot level above 1st.",
		],
		duration: "Up to 1 minute",
		components: ["V", "S", "M"],
		material: "A twig from a tree that has been struck by lightning",
		ritual: false,
		concentration: true,
		casting_time: "1 Action",
		attack_type: "ranged",
		range: "30 feet",
		damage: {
			damage_at_slot_level: {
				1: "1d12",
				2: "2d12",
				3: "3d12",
				4: "4d12",
				5: "5d12",
				6: "6d12",
				7: "7d12",
				8: "8d12",
				9: "9d12",
			},
			damage_type: {
				name: "Lightning",
			},
		},
		school: {
			index: "evocation",
			level: 1,
			name: "Evocation",
			url: "/schools/evocation",
		},
		classes: [
			{
				index: "wizard",
				level: 1,
				name: "Wizard",
				url: "/classes/wizard",
			},
		],
	},
	{
		index: "blade-ward",
		level: 0,
		name: "Blade Ward",
		url: "/spells/blade-ward",
		desc: [
			"You extend your hand and trace a sigil of warding in the air. Until the end of your next turn, you have resistance against bludgeoning, piercing, and slashing damage dealt by weapon attacks.",
		],
		shortDesc: "",
		higher_level: [],
		duration: "1 round",
		components: ["V", "S"],
		material: "A diamond worth at least 50gp",
		ritual: false,
		concentration: false,
		casting_time: "1 Action",
		range: "Self",
		school: {
			index: "abjuration",
			level: 0,
			name: "Abjuration",
			url: "/schools/abjuration",
		},
		classes: [
			{
				index: "wizard",
				level: 0,
				name: "Wizard",
				url: "/classes/wizard",
			},
		],
	},
];
