// rollup.config.js
export default {
	input: "src/components/home-page.js",
	output: {
		file: "public/main.js",
		name: "main",
		format: "iife"
	}
};
