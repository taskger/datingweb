const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  role: String,
  language: String ,
  profile: {
    name: String,
    birthday: String,
    age: Number,
    salary: Number,
    status: String,
    gender: String,
    ethnicity: String,
    height: Number,
    religion: String,
    chinese_zodiac: String,
    western_zodiac: String,
    group: String,
    degree: String,
    university: String,
    lifestyle: {
      pet: Boolean,
      exercise: Boolean,
      book: Boolean,
      game: Boolean,
      healthy: Boolean,
      alcohol: Boolean,
      smoke: Boolean,
      weed: Boolean,
    },
    hobbys: {
      adventure: [String],
      song: [String],
      sport: [String],
      movie: [String],
      content: [String],
      travel: [String],
      game: [String],
      selfcare: [String],
    },
    contact: {
      facebook: String,
      ig: String,
      telephone: String,
    },
    like: [String],
    location: {
      lat: Number,
      lng: Number,
    }
  }
});

module.exports = mongoose.model('User', userSchema);