const controller = require('./food.controller');

module.exports = (router) => {
  router.get('/example', controller.example);
};
