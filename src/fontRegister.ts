import { Font } from "@react-pdf/renderer";
import regular from "./fonts/Nunito-Regular.ttf";
import medium from "./fonts/Nunito-Medium.ttf";
import bold from "./fonts/Nunito-Bold.ttf";
import italic from "./fonts/Nunito-Italic.ttf";

Font.register({
	family: "Nunito",
	fonts: [
		{
			src: regular,
		},
		{
			src: medium,
			fontWeight: "medium",
		},
		{
			src: bold,
			fontWeight: "bold",
		},
		{
			src: italic,
			fontStyle: "italic",
		},
	],
});
