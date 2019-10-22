const controller = require('./user.controller');

module.exports = (router) => {
  router.get('/subscribe', controller.subscribe);
};
