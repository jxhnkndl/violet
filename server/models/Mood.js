const { Schema, model } = require('mongoose');
const dayjs = require('dayjs');

const moodSchema = new Schema(
  { 
    date: {
      type: Date,
      default: Date.now,
      required: true,
      get: date => dayjs(date).format('MM/DD/YYYY')
    },
    mood: {
      type: Number,
      required: true,
      get: moodRating => parseInt(moodRating)
    },
    anxiety: {
      type: Number,
      required: true,
      get: anxietyRating => parseInt(anxietyRating)
    },
    insomnia: {
      type: Number,
      required: true,
      get: insomniaRating => parseInt(insomniaRating)
    },
    panicAttacks: {
      type: Number,
      default: 0,
      get: attacks => parseInt(attacks)
    },
    symptoms: [{
      type: String
    }],
    accomplishments: {
      type: String
    },
    notes: {
      type: String
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

const Mood = model('Mood', moodSchema);

module.exports = Mood;