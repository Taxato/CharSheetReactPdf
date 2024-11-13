type Spell = {
	name: string;
	description: string;
	level: number;
	school:
		| "MISSING SCHOOL"
		| "Abjuration"
		| "Evocation"
		| "Conjuration"
		| "Divination"
		| "Transmutation"
		| "Enchantment";

	castTime: string;
	duration: string;
	range: string;

	verbal: boolean;
	somatic: boolean;
	material: boolean;
	ritual: boolean;
	cost: number;
};

const defaultSpell: Spell = {
	name: "MISSING NAME",
	description: "MISSING DESCRIPTION",
	level: 0,
	school: "MISSING SCHOOL",

	castTime: "Action",
	duration: "Instantaneous",
	range: "Touch",

	material: false,
	somatic: false,
	verbal: false,
	ritual: false,
	cost: 0,
};

const rawSpells: Partial<Spell>[] = [
	//#region CANTRIPS
	{
		name: "Fire Bolt",
		school: "Evocation",
		description:
			"You hurl a mote of fire at a creature or an object within range. Make a ranged spell attack against the target. On a hit, the target takes 1d10 Fire damage. A flammable object hit by this spell starts burning if it isn't being worn or carried. Cantrip Upgrade. The damage increases by 1d10 when you reach levels 5 (2d10), 11 (3d10), and 17 (4d10).",
		range: "120 feet",
		verbal: true,
		somatic: true,
	},
	{
		name: "Light",
		school: "Evocation",
		description:
			"You touch one Large or smaller object that isn't being worn or carried by someone else. Until the spell ends, the object sheds Bright Light in a 20-foot radius and Dim Light for an additional 20 feet. The light can be colored as you like. Covering the object with something opaque blocks the light. The spell ends if you cast it again.",
		duration: "1 hour",
		verbal: true,
		material: true,
	},
	{
		name: "Mage Hand",
		school: "Conjuration",
		range: "30 feet",
		verbal: true,
		somatic: true,
		duration: "1 minute",
		description:
			"A spectral, floating hand appears at a point you choose within range. The hand lasts for the duration. The hand vanishes if it is ever more than 30 feet away from you or if you cast this spell again. When you cast the spell, you can use the hand to manipulate an object, open an unlocked door or container, stow or retrieve an item from an open container, or pour the contents out of a vial. As a Magic action on your later turns, you can control the hand thus again. As part of that action, you can move the hand up to 30 feet. The hand can't attack, activate magic items, or carry more than 10 pounds.",
	},
	{
		name: "Mending",
		school: "Transmutation",
		description:
			"This spell repairs a single break or tear in an object you touch, such as a broken chain link, two halves of a broken key, a torn cloak, or a leaking wineskin. As long as the break or tear is no larger than 1 foot in any dimension, you mend it, leaving no trace of the former damage. This spell can physically repair a magic item, but it can't restore magic to such an object.",
		castTime: "1 minute",
		verbal: true,
		somatic: true,
		material: true,
	},
	//#endregion

	//#region FIRST LEVEL
	{
		name: "Identify",
		level: 1,
		school: "Divination",
		ritual: true,
		verbal: true,
		somatic: true,
		material: true,
		// cost: 100,
		description:
			"You touch an object throughout the spell's casting. If the object is a magic item or some other magical object, you learn its properties and how to use them, whether it requires Attunement, and how many charges it has, if any. You learn whether any ongoing spells are affecting the item and what they are. If the item was created by a spell, you learn that spell's name. If you instead touch a creature throughout the casting, you learn which ongoing spells, if any, are currently affecting it.",
	},
	{
		name: "Detect Magic",
		level: 1,
		school: "Divination",
		ritual: true,
		range: "Self",
		verbal: true,
		somatic: true,
		duration: "Concentration, up to 10 minutes",
		description:
			"For the duration, you sense the presence of magical effects within 30 feet of yourself. If you sense such effects, you can take the Magic action to see a faint aura around any visible creature or object in the area that bears the magic, and if an effect was created by a spell, you learn the spell's school of magic. The spell is blocked by 1 foot of stone, dirt, or wood; 1 inch of metal; or a thin sheet of lead.",
	},
	{
		name: "Mage Armor",
		level: 1,
		school: "Abjuration",
		verbal: true,
		somatic: true,
		material: true,
		duration: "8 hours",
		description:
			"You touch a willing creature who isn't wearing armor. Until the spell ends, the target's base AC becomes 13 plus its Dexterity modifier. The spell ends early if the target dons armor.",
	},
	{
		name: "Shield",
		level: 1,
		school: "Abjuration",
		castTime:
			"Reaction, when hit by attack or targeted by Magic Missile spell",
		range: "Self",
		verbal: true,
		somatic: true,
		duration: "1 round",
		description:
			"An imperceptible barrier of magical force protects you. Until the start of your next turn, you have a +5 bonus to AC, including against the triggering attack, and you take no damage from Magic Missile.",
	},
	{
		name: "Tenser's Floating Disk",
		level: 1,
		school: "Conjuration",
		ritual: true,
		range: "30 feet",
		verbal: true,
		somatic: true,
		material: true,
		duration: "1 hour",
		description:
			"This spell creates a circular, horizontal plane of force, 3 feet in diameter and 1 inch thick, that floats 3 feet above the ground in an unoccupied space of your choice that you can see within range. The disk remains for the duration, and can hold up to 500 pounds. If more weight is placed on it, the spell ends, and everything on the disk falls to the ground. The disk is immobile while you are within 20 feet of it. If you move more than 20 feet away from it, the disk follows you so that it remains within 20 feet of you. It can move across uneven terrain, up or down stairs, slopes, and the like, but it can’t cross an elevation change of 10 feet or more. For example, the disk can’t move across a 10-foot-deep pit, nor could it leave such a pit if it were created at the bottom. If you move more than 100 feet from the disk (typically because it can't move around an obstacle to follow you), the spell ends.",
	},
	{
		name: "Burning Hands",
		level: 1,
		school: "Evocation",
		range: "Self",
		verbal: true,
		somatic: true,
		description:
			"A thin sheet of flames shoots forth from you. Each creature in a 15-foot Cone makes a Dexterity saving throw, taking 3d6 Fire damage on a failed save or half as much damage on a successful one. Flammable objects in the Cone that aren't being worn or carried start burning.\nUsing a Higher-Level Spell Slot. The damage increases by 1d6 for each spell slot level above 1.",
	},
	{
		name: "Comprehend Languages",
		level: 1,
		school: "Divination",
		ritual: true,
		range: "Self",
		verbal: true,
		somatic: true,
		material: true,
		duration: "1 hour",
		description:
			"For the duration, you understand the literal meaning of any language that you hear or see signed. You also understand any written language that you see, but you must be touching the surface on which the words are written. It takes about 1 minute to read one page of text. This spell doesn't decode symbols or secret messages.",
	},
	{
		name: "Chromatic Orb",
		level: 1,
		school: "Evocation",
		range: "90 feet",
		verbal: true,
		somatic: true,
		material: true,
		// cost: 90,
		description:
			"You hurl an orb of energy at a target within range. Choose Acid, Cold, Fire, Lightning, Poison, or Thunder for the type of orb you create, and then make a ranged spell attack against the target. On a hit, the target takes 3d8 damage of the chosen type.\nIf you roll the same number on two or more of the d8s, the orb leaps to a different target of your choice within 30 feet of the target. Make an attack roll against the new target, and make a new damage roll. The orb can't leap again unless you cast the spell with a level 2+ spell slot.\nUsing a Higher-Level Spell Slot. The damage increases by 1d8 for each spell slot level above 1. The orb can leap a maximum number of times equal to the level of the slot expended, and a creature can be targeted only once by each casting of this spell.",
	},
	//#endregion

	//#region SECOND LEVEL
	{
		name: "Levitate",
		level: 2,
		school: "Transmutation",
		range: "60 feet",
		verbal: true,
		somatic: true,
		material: true,
		duration: "Concentration, up to 10 minutes",
		description:
			"One creature or loose object of your choice that you can see within range rises vertically up to 20 feet and remains suspended there for the duration. The spell can levitate an object that weighs up to 500 pounds. An unwilling creature that succeeds on a Constitution saving throw is unaffected. The target can move only by pushing or pulling against a fixed object or surface within reach (such as a wall or a ceiling), which allows it to move as if it were climbing. You can change the target's altitude by up to 20 feet in either direction on your turn. If you are the target, you can move up or down as part of your move. Otherwise, you can take a Magic action to move the target, which must remain within the spell's range. When the spell ends, the target floats gently to the ground if it is still aloft.",
	},
	// {
	// 	name: "Knock",
	// 	level: 2,
	// 	range: "60 feet",
	// 	verbal: true,
	// 	description:
	// 		"Choose an object that you can see within range. The object can be a door, a box, a chest, a set of manacles, a padlock, or another object that contains a mundane or magical means that prevents access. A target that is held shut by a mundane lock or that is stuck or barred becomes unlocked, unstuck, or unbarred. If the object has multiple locks, only one of them is unlocked. If the target is held shut by Arcane Lock, that spell is suppressed for 10 minutes, during which time the target can be opened and closed. When you cast the spell, a loud knock, audible up to 300 feet away, emanates from the target.",
	// },
	{
		name: "See Invisibility",
		level: 2,
		school: "Divination",
		range: "Self",
		verbal: true,
		somatic: true,
		material: true,
		duration: "1 hour",
		description:
			"For the duration, you see creatures and objects that have the Invisible condition as if they were visible, and you can see into the Ethereal Plane. Creatures and objects there appear ghostly.",
	},
	{
		name: "Misty Step",
		level: 2,
		school: "Conjuration",
		range: "Self",
		verbal: true,
		description:
			"Briefly surrounded by silvery mist, you teleport up to 30 feet to an unoccupied space you can see.",
	},
	{
		name: "Augury",
		level: 2,
		school: "Divination",
		ritual: true,
		castTime: "1 minute",
		range: "Self",
		verbal: true,
		somatic: true,
		material: true,
		// cost: 25,
		description:
			"You receive an omen from an otherworldly entity about the results of a course of action that you plan to take within the next 30 minutes. The DM chooses the omen from the Omens table. The spell doesn't account for circumstances, such as other spells, that might change the results. If you cast the spell more than once before finishing a Long Rest, there is a cumulative 25 percent chance for each casting after the first that you get no answer.",
	},
	//#endregion

	//#region THIRD LEVEL
	{
		name: "Counterspell",
		level: 3,
		school: "Abjuration",
		castTime:
			"Reaction, which you take when you see a creature within 60 feet of yourself casting a spell with Verbal, Somatic, or Material components",
		range: "60 feet",
		somatic: true,
		description:
			"You attempt to interrupt a creature in the process of casting a spell. The creature must make a Constitution saving throw. On a failed save, the spell dissipates with no effect, and the action, Bonus Action, or Reaction used to cast it is wasted. If that spell was cast with a spell slot, the slot isn't expended.",
	},
	{
		name: "Dispel Magic",
		level: 3,
		school: "Abjuration",
		range: "120 feet",
		verbal: true,
		somatic: true,
		description:
			"Choose one creature, object, or magical effect within range. Any ongoing spell of level 3 or lower on the target ends. For each ongoing spell of level 4 or higher on the target, make an ability check using your spellcasting ability (DC 10 plus that spell's level). On a successful check, the spell ends.\nUsing a Higher-Level Spell Slot. You automatically end a spell on the target if the spell's level is equal to or less than the level of the spell slot you use.",
	},
	{
		name: "Remove Curse",
		level: 3,
		school: "Abjuration",
		verbal: true,
		somatic: true,
		description:
			"At your touch, all curses affecting one creature or object end. If the object is a cursed magic item, its curse remains, but the spell breaks its owner's Attunement to the object so it can be removed or discarded.",
	},
	{
		name: "Lightning Bolt",
		level: 3,
		school: "Evocation",
		range: "Self",
		verbal: true,
		somatic: true,
		material: true,
		description:
			"A stroke of lightning forming a 100-foot-long, 5-foot-wide Line blasts out from you in a direction you choose. Each creature in the Line makes a Dexterity saving throw, taking 8d6 Lightning damage on a failed save or half as much damage on a successful one.\nUsing a Higher-Level Spell Slot. The damage increases by 1d6 for each spell slot level above 3.",
	},
	//#endregion

	//#region FOURTH LEVEL
	{
		name: "Divination",
		level: 4,
		school: "Divination",
		ritual: true,
		verbal: true,
		somatic: true,
		material: true,
		cost: 25,
		description:
			"This spell puts you in contact with a god or a god's servants. You ask one question about a specific goal, event, or activity to occur within 7 days. The DM offers a truthful reply, which might be a short phrase or cryptic rhyme. The spell doesn't account for circumstances that might change the answer, such as the casting of other spells.\nIf you cast the spell more than once before finishing a Long Rest, there is a cumulative 25 percent chance for each casting after the first that you get no answer.",
	},
	{
		name: "Fabricate",
		level: 4,
		school: "Transmutation",
		castTime: "10 minutes",
		range: "120 feet",
		verbal: true,
		somatic: true,
		description:
			"You convert raw materials into products of the same material. For example, you can fabricate a wooden bridge from a clump of trees, a rope from a patch of hemp, or clothes from flax or wool. Choose raw materials that you can see within range. You can fabricate a Large or smaller object (contained within a 10-foot Cube or eight connected 5-foot Cubes) given a sufficient quantity of material. If you're working with metal, stone, or another mineral substance, however, the fabricated object can be no larger than Medium (contained within a 5-foot Cube). The quality of any fabricated objects is based on the quality of the raw materials. Creatures and magic items can't be created by this spell. You also can't use it to create items that require a high degree of skill—such as weapons and armor—unless you have proficiency with the type of Artisan's Tools used to craft such objects.",
	},
	//#endregion
];

export const spells: Spell[] = rawSpells.map(spell =>
	Object.assign({ ...defaultSpell }, spell)
);

export const spellList: string[] = [
	"fire-bolt",
	"light",
	"mage-hand",
	"mending",
	"identify",
	"detect-magic",
];
