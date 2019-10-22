const mongoose = require('mongoose');

const User = mongoose.model('User');

const ZomatoService = require('../../shared/service/zomato');

const explore = async (pastUsers) => {
  const { location } = await User.findOne({
    _id: {
      $ne: pastUsers.map(u => u._id),
    }
  }, 'location') || {};

  if (!location) {
    return;
  }

  const users = await User.find({
    location: {
      $near: {
        $geometry: location,
        $maxDistance: 2000,
      },
    },
  });

  const restaurants = await ZomatoService.geocode(
    location.coordinates[1],
    location.coordinates[0],
  );

  users.forEach((u) => {
    const selectedRestaurants = restaurants.filter(r => u.highestPrice <= r.pricePerPerson);
    // TODO: send email
  });

  explore(users);
};

const cron = async (req, res) => {
  explore([]);

  res.success({ status: 'working' });
};

module.exports = {
  cron,
};
