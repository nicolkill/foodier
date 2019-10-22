const mongoose = require('mongoose');

const User = mongoose.model('User');

const {
  CUISINES,
} = require('../../config/constants');
const validator = require('../../config/validator');
const validations = require('../../config/validations');

const subscribe = async (req, res) => {
  const params = req.body;
  validator.validate(params, {
    name: [validations.Required, validations.Type.String],
    surname: [validations.Required, validations.Type.String],
    email: [validations.Required, validations.Type.Email],
    cuisines: [validations.Required, validations.Include(Object.values(CUISINES))],
    'location.lat': [validations.Required],
    'location.lon': [validations.Required],
  });

  params.location = {
    type: 'Point',
    coordinates: [
      +location.lon,
      +location.lat,
    ],
  };

  const user = await User.create(params);

  res.success(user);
};

module.exports = {
  subscribe,
};
