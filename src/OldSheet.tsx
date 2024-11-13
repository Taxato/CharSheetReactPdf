// import { Document, Page, Text, View } from "@react-pdf/renderer";
// import { spells } from "./spells";

// export default function App() {
// 	const spellLists: Spell[][] = [];

// 	for (const spell of spells) {
// 		if (spellLists[spell.level] === undefined) {
// 			spellLists[spell.level] = [];
// 		}
// 		spellLists[spell.level].push(spell);
// 	}

// 	return (
// 		<Document title="Zerachiel">
// 			<Page
// 				size="A4"
// 				style={{
// 					padding: 10,
// 					fontFamily: "Nunito",
// 				}}>
// 				<Header />

// 				{spellLists.map((spellList, index) => (
// 					<SpellList
// 						key={index}
// 						level={index}
// 						spellList={spellList}
// 					/>
// 				))}
// 			</Page>
// 			<Page
// 				size="A4"
// 				style={{
// 					padding: 10,
// 					fontFamily: "Nunito",
// 				}}>
// 				<Header />
// 			</Page>
// 		</Document>
// 	);
// }

// function Header() {
// 	return (
// 		<View
// 			style={{
// 				fontSize: 20,
// 				textAlign: "center",
// 			}}>
// 			<Text style={{ fontWeight: "bold" }}>
// 				Zerachiel Emethius Peregrus-Omnis
// 			</Text>

// 			<View
// 				style={{
// 					display: "flex",
// 					flexDirection: "column",
// 					gap: 6,
// 					textAlign: "left",
// 				}}>
// 				<Text style={{ fontWeight: "bold", fontSize: 15 }}>
// 					Spellcasting Components
// 				</Text>
// 				<View>
// 					<Text style={{ fontWeight: "medium", fontSize: 10 }}>
// 						Verbal (V)
// 					</Text>
// 					<Text style={{ fontSize: 8 }}>
// 						Most spells require the chanting of mystic words. The
// 						words themselves aren't the source of the spell's power;
// 						rather, the particular combination of sounds, with
// 						specific pitch and resonance, sets the threads of magic
// 						in motion. Thus, a character who is gagged or in an area
// 						of silence, such as one created by the silence spell,
// 						can't cast a spell with a verbal component.
// 					</Text>
// 				</View>
// 				<View>
// 					<Text style={{ fontWeight: "medium", fontSize: 10 }}>
// 						Somatic (S)
// 					</Text>
// 					<Text style={{ fontSize: 8 }}>
// 						Spellcasting gestures might include a forceful
// 						gesticulation or an intricate set of gestures. If a
// 						spell requires a somatic component, the caster must have
// 						free use of at least one hand to perform these gestures.
// 					</Text>
// 				</View>
// 				<View>
// 					<Text style={{ fontWeight: "medium", fontSize: 10 }}>
// 						Material (M)
// 					</Text>
// 					<Text style={{ fontSize: 8 }}>
// 						Casting some spells requires particular objects,
// 						specified in parentheses in the component entry. A
// 						character can use a component pouch or a spellcasting
// 						focus (found in “Equipment”) in place of the components
// 						specified for a spell. But if a cost is indicated for a
// 						component, a character must have that specific component
// 						before he or she can cast the spell. If a spell states
// 						that a material component is consumed by the spell, the
// 						caster must provide this component for each casting of
// 						the spell. A spellcaster must have a hand free to access
// 						a spell's material components -- or to hold a
// 						spellcasting focus -- but it can be the same hand that
// 						he or she uses to perform somatic components.
// 					</Text>
// 				</View>
// 			</View>
// 		</View>
// 	);
// }

// function makeComponentString(spell: Spell) {
// 	return [
// 		spell.verbal && "V",
// 		spell.somatic && "S",
// 		spell.material && "M",
// 		spell.cost > 0 && `Cost: ${spell.cost}gp`,
// 	]
// 		.filter(c => c)
// 		.join(", ");
// }

// function Spell({ spell }: { spell: Spell }) {
// 	const componentString = makeComponentString(spell);

// 	return (
// 		<View
// 			wrap={false}
// 			style={{
// 				border: 1,
// 				borderRadius: 10,
// 				padding: 5,
// 				margin: 2,
// 			}}>
// 			<View
// 				style={{
// 					display: "flex",
// 					flexDirection: "row",
// 					alignItems: "center",
// 				}}>
// 				<Text
// 					style={{
// 						fontSize: 12,
// 						fontWeight: "bold",
// 					}}>
// 					{spell.name}
// 				</Text>
// 				<Text
// 					style={{
// 						marginLeft: 4,
// 						fontSize: 8,
// 						fontStyle: "italic",
// 					}}>
// 					({spell.school})
// 				</Text>
// 				{componentString && (
// 					<Text
// 						style={{
// 							marginLeft: 10,
// 							fontSize: 10,
// 							fontWeight: "medium",
// 						}}>
// 						Components: {componentString}
// 					</Text>
// 				)}
// 				<Text
// 					style={{
// 						marginLeft: 10,
// 						fontSize: 10,
// 						fontWeight: "medium",
// 					}}>
// 					Casting time:&nbsp;
// 					{spell.ritual
// 						? `${spell.castTime} or ritual`
// 						: spell.castTime}
// 				</Text>
// 			</View>

// 			<Text style={{ fontSize: 8, fontStyle: "italic" }}>
// 				{spell.description}
// 			</Text>
// 		</View>
// 	);
// }

// function SpellList({
// 	spellList,
// 	level,
// }: {
// 	spellList: Spell[];
// 	level: number;
// }) {
// 	return (
// 		<View break={level !== 0}>
// 			<Text
// 				style={{
// 					textAlign: "center",
// 					fontWeight: "bold",
// 					fontSize: 15,
// 				}}>
// 				{level === 0 ? "Cantrips" : `Level ${level}`}
// 			</Text>
// 			<View>
// 				{spellList.map(spell => (
// 					<Spell
// 						key={spell.name}
// 						spell={spell}
// 					/>
// 				))}
// 			</View>
// 		</View>
// 	);
// }
