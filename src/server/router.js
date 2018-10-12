import { render, renderToString } from "@popeindustries/lit-html-server";
import stream from "stream-template";
import router from "koa-router";
import { index } from "../pages/";
import ssr from "../utils/puppeteer";

let routes = router();

// routes definition
routes.get("/", async ctx => {
	const page =  await renderToString(index({
		title: "Home Page",
		body: '<home-page></home-page>',
		scripts: ["http://localhost:3000/home/home.js"]
	}))
	const renderedHTML = await ssr(ctx.request.originalUrl, page);

	ctx.type = "text/html; charset=utf-8";
	ctx.body = stream`${renderedHTML.html}`;

});

export default routes;
