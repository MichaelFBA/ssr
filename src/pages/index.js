export const index = (head, body) => {
	return `
	<!DOCTYPE html>
	<html>
		<head>
			<title>Title of the document</title>
			${head || ""}
		</head>
		
		<body>
			${body || ""}
			<h1>This is the home page</h1>
			<p>This is content</p>

			<home-page></home-page>
			<script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.0.2/webcomponents-loader.js"></script>
			<script src="https://cdnjs.cloudflare.com/ajax/libs/shadydom/1.1.0/shadydom.min.js"></script>
			<script src="http://localhost:3000/main.js"></script>
		</body>
	
	</html>
	`;
};
