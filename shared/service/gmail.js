const nodemailer = require('nodemailer');

const logger = require('../logger');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_PASSWORD
  }
});

const formatRestaurant = restaurant => `
<a href="${restaurant.url}">
<img src="${restaurant.img}" alt="restaurant thumb"/>
<br>
${restaurant.name} ubicado en ${restaurant.address} - Promedio de $ ${restaurant.pricePerPerson}
</a>
`;

const formatBase = (user, selectedRestaurants) => `
<p>
  Que bueno verte ${user.fullName}, te tenemos unas buenas recomendaciones para que salgas a comer
  <br>
  ${selectedRestaurants.map(formatRestaurant).join('<br>')}
</p>
`;

const sendNewRecommendationsEmail = async (user, selectedRestaurants) => {
  let info = await transporter.sendMail({
    to: user.email,
    from: `Foodier tu guia de comida :P <${process.env.GMAIL_EMAIL}>`,
    subject: 'Foodier: Nuevas recomendaciones cerca de ti',
    html: formatBase(user, selectedRestaurants),
  });

  logger.info({
    group: 'GmailService',
    method: 'sendNewRecommendationsEmail',
    metadata: {
      info,
    },
  });
};

module.exports = {
  sendNewRecommendationsEmail,
};
