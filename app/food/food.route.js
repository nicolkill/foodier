const controller = require('./food.controller');

module.exports = (router) => {
  router.post('/cron', controller.cron);
};
