import puppeteer from "puppeteer";

// const renderedHTML = await ssr(
// 	`${ctx.protocol}://${ctx.host}/${ctx.params.page}`
// );
// console.log(renderedHTML);

// In-memory cache of rendered pages. Note: this will be cleared whenever the
// server process stops. If you need true persistence, use something like
// Google Cloud Storage (https://firebase.google.com/docs/storage/web/start).
const RENDER_CACHE = new Map();

async function ssr(url, html) {
	if (RENDER_CACHE.has(url)) {
		return { html: RENDER_CACHE.get(url), ttRenderMs: 0 };
	}

	const start = Date.now();

	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.setJavaScriptEnabled(true);
	page.evaluateOnNewDocument("customElements.forcePolyfill = true");
	page.evaluateOnNewDocument("ShadyDOM = {force: true}");
	page.evaluateOnNewDocument("ShadyCSS = {shimcssproperties: true}");
	await page.goto(`data:text/html,${html}`, { waitUntil: "networkidle0" });
	// await page.setContent(html, { waitUntil: "networkidle0" });

	const renderedHTML = await page.content(); // serialized renderedHTML of page DOM.
	await browser.close();

	const ttRenderMs = Date.now() - start;
	console.info(`Headless rendered page in: ${ttRenderMs}ms`);

	RENDER_CACHE.set(url, renderedHTML); // cache rendered page.

	return { html, ttRenderMs };
}

export { ssr as default };
