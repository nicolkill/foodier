const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  surname: String,
  email: String,
  cuisines: [{
    type: String,
  }],
}, {
  collection: 'countries',
  timestamps: true,
  toJSON: {
    transform(_, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  },
});

module.exports = mongoose.model('User', userSchema);
