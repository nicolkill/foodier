const axios = require('axios');

const logger = require('../logger');

const instance = axios.create({
  baseURL: 'https://developers.zomato.com/api/v2.1',
  timeout: 30000,
  headers: {
    'user-key': process.env.ZOMATO_API_KEY,
  },
});

const geocode = async (lat, lon) => {
  const response = await instance.request({
    url: '/geocode',
    method: 'get',
    params: {
      lat,
      lon,
    },
  });

  const info = response.data.nearby_restaurants.map(r => ({
    url: r.restaurant.url,
    name: r.restaurant.name,
    img: r.restaurant.thumb,
    pricePerPerson: r.restaurant.average_cost_for_two / 2,
    address: r.restaurant.location.address
  }));

  logger.info({
    group: 'ZomatoService',
    method: 'geocode',
    metadata: {
      info,
    },
  });

  return info
};

module.exports = {
  geocode,
};
