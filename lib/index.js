const http = require("http");
const compose = require("./compose");

function Koa() {
  if (!(this instanceof Koa)) {
    return new Koa();
  }
  this.middlewares = [];

  return this;
}

Koa.prototype = {
  constructor: Koa,
  respond: function(cxt) {
    cxt.res.end(cxt.body);
  },
  handleContext: function(req, res) {
    const cxt = {};
    cxt.req = req;
    cxt.res = res;
    return cxt;
  },
  handleRequest: function(cxt, fn) {
    return fn(cxt)
      .then(() => {
        return this.respond(cxt);
      })
      .catch(err => {
        console.log(err);
      });
  },
  callback: function() {
    const fn = compose(this.middlewares);
    return (req, res) => {
      const cxt = this.handleContext(req, res);
      return this.handleRequest(cxt, fn);
    };
  },
  use: function(middleware) {
    this.middlewares.push(middleware);
    return this;
  },
  listen: function(...args) {
    const app = http.createServer(this.callback());
    app.listen(...args);
  }
};

module.exports = Koa;
