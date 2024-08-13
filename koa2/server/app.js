const Koa = require("koa");
const logger = require("koa-logger");
const json = require("koa-json");
const views = require("koa-views");
const onerror = require("koa-onerror");
const cors = require("koa2-cors");
const bodyparser = require("koa-bodyparser");
const static = require("koa-static");
const index = require("./src/routes/index");
const users = require("./src/routes/users");

const app = new Koa();

// error handler
onerror(app);

// global middlewares
app.use(
  views(__dirname + "/views", {
    extension: "jade",
  })
);
app.use(bodyparser());
app.use(json());
app.use(logger());
app.use(cors());

// log request time
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log("%s %s - %s", ctx.method, ctx.url, ms);
});

app.use(static(__dirname + "/public"));

// routes definition
app.use(index.routes()).use(index.allowedMethods());
app.use(users.routes()).use(users.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;
