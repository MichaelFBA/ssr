import resolve from "rollup-plugin-node-resolve";
import minify from "rollup-plugin-babel-minify";
import alias from "rollup-plugin-alias";
import glob from "glob";
import replace from "rollup-plugin-replace";

const dev = process.env.NODE_ENV === "development";

const configs = glob.sync("src/pages/*/*.js").map(input => ({
	input,
	output: [
		{
			file: input.replace(/^src\/pages/, "public"),
			format: "iife",
			name: input
		}
	],
	plugins: [
		resolve(),
		// minify({ comments: false }),
		alias({
			"lit-html": "node_modules/lit-html/lit-html.js"
		})
	]
}));
configs.push(
		{
		input: "src/service-worker/sw.js",
		plugins: [
			replace({
				__CACHEVERSION__: dev ? "dev" : Date.now(),
				__MANIFEST__: JSON.stringify(
					[].concat(
						// routes
						"/",

						glob
							.sync("public/**/*.*")
							.filter(x => !x.includes('sw.js'))
							.map(x => `/${x.slice(7)}`)
					)
				)
			}),
		],
		output: {
			file: "public/sw.js",
			format: "iife",
			sourcemap: false
		}
	}
)

// rollup.config.js
export default configs;
