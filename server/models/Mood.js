const { Schema, model } = require('mongoose');
const convertToNumber = require('../utils/parseInt');

const moodSchema = new Schema(
  { 
    date: {
      type: Date,
      default: Date.now,
      required: true
    },
    mood: {
      type: Number,
      required: true,
      get: moodRating => convertToNumber(moodRating)
    },
    anxiety: {
      type: Number,
      required: true,
      get: anxietyRating => convertToNumber(anxietyRating)
    },
    insomnia: {
      type: Number,
      required: true,
      get: insomniaRating => convertToNumber(insomniaRating)
    },
    symptoms: {
      type: String
    },
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