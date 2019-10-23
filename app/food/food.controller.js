const mongoose = require('mongoose');

const User = mongoose.model('User');

const ZomatoService = require('../../shared/service/zomato');
const GmailService = require('../../shared/service/gmail');

const explore = async (pastUsers) => {
  const filter = {};
  if (pastUsers.length > 0) {
    filter._id = {
      $ne: pastUsers.map(u => u._id),
    }
  }
  const { location } = await User.findOne(filter, 'location') || {};

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

  users.forEach((user) => {
    const selectedRestaurants = restaurants.filter(r => user.highestPrice <= r.pricePerPerson);
    GmailService.sendNewRecommendationsEmail(user, selectedRestaurants)
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
