const Koa = require("./lib");

const app = Koa();

app.use(async function(cxt, next) {
  await next();
  cxt.body = "123123";
});

app.listen(7000, () => {
  console.log("start server at 7000");
});
