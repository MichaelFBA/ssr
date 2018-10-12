import Koa from "koa";
import serve from "koa-static";
import routes from "./src/server/router";

const app = new Koa();
//Serve Public
app.use(serve("./public"));

//Routes
app.use(routes.routes());

app.listen(3000);
