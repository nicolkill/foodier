const controller = require('./food.controller');

module.exports = (router) => {
  router.get('/cron', controller.cron);
};
