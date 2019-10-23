const controller = require('./user.controller');

module.exports = (router) => {
  router.post('/subscribe', controller.subscribe);
};
