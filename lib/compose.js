/**
 * koa洋葱模型
 * @author shijinhua
 * @date 2020-01-17
 * @param {any} middlewares
 * @returns {any}
 */
module.exports = function(middlewares) {
  return function(cxt, next) {
    let index = -1;
    return dispatch(0);
    function dispatch(i) {
      if (i <= index) {
        return Promise.reject("called error");
      }
      let fn = middlewares[i];
      index = i;
      if (i === middlewares.length) {
        fn = next;
      }
      if (!fn) {
        return Promise.resolve;
      }
      try {
        return Promise.resolve(fn(cxt, dispatch.bind(null, i + 1)));
      } catch (error) {
        return Promise.reject(error);
      }
    }
  };
};
