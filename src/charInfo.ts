export const charInfo: CharInfo = {
	level: 7,
	preparedSlots: 13,
	spellSlots: {
		1: 4,
		2: 3,
		3: 3,
		4: 1,
	},
	spellCastModifier: 4,
	spellSaveDc: 17,
	spellAttackBonus: 9,
	spellCastAbility: "Intelligence",
};

export type CharInfo = {
	level: number;
	preparedSlots: number;
	spellSlots: Record<number, number>;
	spellCastModifier: number;
	spellSaveDc: number;
	spellAttackBonus: number;
	spellCastAbility: string;
};
