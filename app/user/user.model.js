const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  surname: String,
  email: String,
  highestPrice: Number,
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
}, {
  collection: 'users',
  timestamps: true,
  toJSON: {
    transform(_, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  },
});

userSchema.virtual('fullName').get(function () {
  return `${this.name} ${this.surname}`;
});

userSchema.index({
  location: '2dsphere',
},
{
  name: 'location_user',
});

module.exports = mongoose.model('User', userSchema);
