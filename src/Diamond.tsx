import { Rect, Svg } from "@react-pdf/renderer";

export default function Diamond({
	fill = false,
	size = 20,
}: {
	fill?: boolean;
	size?: number;
}) {
	return (
		<Svg
			viewBox="0 0 100 100"
			width={size}
			height={size}>
			<Rect
				width="50"
				height="50"
				stroke="black"
				strokeWidth="3"
				fill={fill ? "black" : "white"}
				transform="translate(50 14.64) rotate(45)"
			/>
		</Svg>
	);
}
