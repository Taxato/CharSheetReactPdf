import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { Spell } from "./api";
import { charInfo, CharInfo } from "./charInfo";
import Diamond from "./Diamond";
import SpellList from "./SpellList";

export default function SpellSheet({ spells }: { spells: Spell[] }) {
	return (
		<Document title="Spellsheet">
			<Page
				size="A4"
				style={{
					padding: 10,
					fontFamily: "Nunito",
				}}>
				<SpellSheetHeader charInfo={charInfo} />

				<SpellList spells={spells}></SpellList>
			</Page>
		</Document>
	);
}

function SpellSheetHeader({ charInfo }: { charInfo: CharInfo }) {
	return (
		<View style={styles.spellSheetHeader}>
			{/* SPELL SLOTS */}
			<View style={styles.spellSlotsContainer}>
				<Text style={{ textAlign: "center", fontSize: 15 }}>
					Spell Slots
				</Text>
				<Text style={{ fontSize: 10 }}>
					Number of prepared slots: {charInfo.preparedSlots}
				</Text>

				{Object.entries(charInfo.spellSlots).map(
					([level, numSlots]) => (
						<SpellSlotsItem
							key={level}
							level={Number(level)}
							numSlots={numSlots}
						/>
					),
				)}
			</View>

			{/* ABILITY SCORES */}
			<View style={styles.abilityContainer}>
				<View style={styles.abilityBox}>
					<Text style={styles.abilityText}>
						Spellcasting Modifier:
					</Text>
					<View style={styles.abilityNumber}>
						<Text>+{charInfo.spellCastModifier}</Text>
					</View>
				</View>

				<View style={styles.abilityBox}>
					<Text style={styles.abilityText}>Spell Save DC:</Text>
					<View style={styles.abilityNumber}>
						<Text>{charInfo.spellSaveDc}</Text>
					</View>
				</View>

				<View style={styles.abilityBox}>
					<Text style={styles.abilityText}>Spell Attack Bonus:</Text>
					<View style={styles.abilityNumber}>
						<Text>+{charInfo.spellAttackBonus}</Text>
					</View>
				</View>
			</View>

			{/* ACTIVE SPELLS */}
			<View style={styles.activeSpellsContainer}>
				<View style={styles.activeSpellsHeader}>
					<Text>Name</Text>
					<Text>Time left</Text>
				</View>
				<Text style={{ fontSize: 8 }}>Concentration spell</Text>
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						gap: 3,
						width: "100%",
						height: 15,
					}}>
					<View
						style={{ borderBottom: "1px solid black", flex: 1 }}
					/>
					<View
						style={{ borderBottom: "1px solid black", flex: 1 }}
					/>
				</View>
				<Text style={{ fontSize: 8, marginTop: 2 }}>Other spells</Text>
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						gap: 3,
						width: "100%",
						height: 15,
					}}>
					<View
						style={{ borderBottom: "1px solid black", flex: 1 }}
					/>
					<View
						style={{ borderBottom: "1px solid black", flex: 1 }}
					/>
				</View>
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						gap: 3,
						width: "100%",
						height: 15,
					}}>
					<View
						style={{ borderBottom: "1px solid black", flex: 1 }}
					/>
					<View
						style={{ borderBottom: "1px solid black", flex: 1 }}
					/>
				</View>
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						gap: 3,
						width: "100%",
						height: 15,
					}}>
					<View
						style={{ borderBottom: "1px solid black", flex: 1 }}
					/>
					<View
						style={{ borderBottom: "1px solid black", flex: 1 }}
					/>
				</View>
			</View>
		</View>
	);
}

function SpellSlotsItem({
	level,
	numSlots,
}: {
	level: number;
	numSlots: number;
}) {
	return (
		<View
			style={{
				display: "flex",
				flexDirection: "row",
				alignItems: "center",
			}}>
			<Text style={{ fontSize: 10, marginRight: 5 }}>Level {level}</Text>
			{Array.from({ length: numSlots }).map((_, index) => (
				<Diamond key={index} />
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	spellSheetHeader: {
		width: "80%",
		marginHorizontal: "auto",
		display: "flex",
		gap: 2,
		flexDirection: "row",
		border: "2px solid black",
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderTopLeftRadius: 15,
		borderBottomRightRadius: 15,
		justifyContent: "space-around",
		marginBottom: 10,
	},

	spellSlotsContainer: {
		width: "30%",
		height: "100%",
	},

	abilityContainer: {
		width: "35%",
		display: "flex",
		flexDirection: "column",
		gap: 3,
		justifyContent: "center",
	},
	abilityBox: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},
	abilityText: {
		fontSize: 12,
		flex: 1,
	},
	abilityNumber: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		border: "1px solid black",
		width: 30,
		height: 30,
		fontSize: 12,
		fontWeight: "bold",
		padding: 3,
		borderRadius: 10,
	},

	activeSpellsContainer: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		width: "20%",
	},
	activeSpellsHeader: {
		paddingHorizontal: 10,
		fontSize: 8,
		display: "flex",
		fontWeight: "bold",
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
		marginBottom: 3,
	},
});
