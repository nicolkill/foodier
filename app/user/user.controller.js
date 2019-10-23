const mongoose = require('mongoose');

const User = mongoose.model('User');

const validator = require('../../shared/validator');
const validations = require('../../shared/validations');

const subscribe = async (req, res) => {
  const params = req.body;
  validator.validate(params, {
    name: [validations.Required, validations.Type.String],
    surname: [validations.Required, validations.Type.String],
    email: [validations.Required, validations.Type.Email],
    highestPrice: [validations.Required, validations.Type.Number],
    'location.lat': [validations.Required],
    'location.lon': [validations.Required],
  });

  params.location = {
    type: 'Point',
    coordinates: [
      +params.location.lon,
      +params.location.lat,
    ],
  };

  const user = await User.create(params);

  res.success(user);
};

module.exports = {
  subscribe,
};
