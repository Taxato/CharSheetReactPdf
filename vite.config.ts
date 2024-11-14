import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			"/api": {
				target: "https://www.aidedd.org/dnd-filters/spells-5e.php",
				changeOrigin: true,
				rewrite: path => path.replace(/^\/api/, ""),
				secure: false,
			},
		},
	},
	base: "/CharSheetReactPdf/",
});
