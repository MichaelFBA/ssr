import { html } from "@popeindustries/lit-html-server";
import repeat from "@popeindustries/lit-html-server/directives/repeat.js";
import unsafe from "@popeindustries/lit-html-server/directives/unsafe-html.js";

export const index = data => {
	return html`
	<!DOCTYPE html>
	<html>
		<head>
			<title>${data.title}</title>
			<link rel="manifest" href="/manifest.json">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			${data.head}
		</head>
		
		<body>
			${unsafe(data.body)}
			<script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.0.2/webcomponents-loader.js"></script>
			<script src="https://cdnjs.cloudflare.com/ajax/libs/shadydom/1.1.0/shadydom.min.js"></script>
			${repeat(
				data.scripts,
				i => i.id,
				(i, index) => html`<script src="${i}"></script>`
	)}
			<script>
				if ("serviceWorker" in navigator) {
					navigator.serviceWorker.register("sw.js");
				}	
			</script>
		</body>
	</html>
	`;
};
