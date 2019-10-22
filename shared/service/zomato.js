const axios = require('axios');

const instance = axios.create({
  baseURL: 'https://developers.zomato.com/api/v2.1',
  timeout: 30000,
  headers: {
    'user-key': process.env.ZOMATO_API_KEY,
  },
});

const geocode = async (lat, lon) => {
  const response = await instance.get({
    lat,
    lon,
  });

  return response.data.nearby_restaurants.map(r => ({
    pricePerPerson: r.restaurant.average_cost_for_two / 2,
  }));
};

module.exports = {
  geocode,
};
