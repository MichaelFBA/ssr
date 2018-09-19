import Koa from "koa";
import { index } from "./src/pages/index";
import ssr from "./src/utils/puppeteer";
import serve from "koa-static";

const app = new Koa();
app.use(serve("./public"));

// response
app.use(async ctx => {
	const renderedHTML = await ssr("/?headless", index(null, "test"));
	console.log(renderedHTML);
	ctx.body = renderedHTML.html;
});

app.listen(3000);
