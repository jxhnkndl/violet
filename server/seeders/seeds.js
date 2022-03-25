const db = require('../config/connection');
const { User, Mood } = require('../models');
const { faker } = require('@faker-js/faker');
const dayjs = require('dayjs');

db.once('open', async () => {
  await User.deleteMany({});
  await Mood.deleteMany({});

  // number of users and moods per user to generate
  const userCount = 5;
  const moodCount = 10;

  const createdUsers = [];

  // create and save new user to database
  for (let i = 0; i < userCount; i++) {
    const userData = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      // create random birthdays between 01-01-1952 and 01-01-2022
      birthday: faker.date.past(50, '2002-01-01'),
      avatar: faker.image.avatar(),
      password: '123456',
    };

    const user = await User.create(userData);

    // push new user into created users array
    createdUsers.push(user);
  }

  const symptoms = [
    'Racing Thoughts',
    'Intrusive Thoughts',
    'Fatigue',
    'Nausea',
    'Melancholy',
    'Headache',
    'GI',
    'Poor Appetite',
    'Poor Focus',
    'Frustration',
    'Sweating',
    'Tremors',
    'Adrenaline',
    'Poor Motivation',
  ];

  // loop through users and create mood charts for each
  for (let i = 0; i < createdUsers.length; i++) {

    // set current date to use when generating mood charts
    let currentDate = dayjs();

    // create array of sequential dates
    for (let j = 0; j <= moodCount; j++) {
      // reset current date to previous date
      currentDate = dayjs(currentDate).subtract(1, 'day');

      const currentSymptoms = [];

      // shuffle symptoms array and generate random number of symptoms to log
      const randomSymptoms = symptoms.sort((a, b) => 0.5 - Math.random());
      const numOfSymptoms = Math.floor(Math.random() * 6);

      // push random number of symptoms in current symptoms array
      for (let k = 0; k <= numOfSymptoms; k++) {
        currentSymptoms.push(randomSymptoms[k]);
      }

      // create and save individual mood chart to database
      const moodData = {
        date: currentDate,
        mood: faker.datatype.number({ min: 1, max: 5 }),
        anxiety: faker.datatype.number({ min: 0, max: 3 }),
        insomnia: faker.datatype.number({ min: 0, max: 3 }),
        symptoms: currentSymptoms,
        accomplishments: faker.lorem.sentences(Math.floor(Math.random() * 4)),
        notes: faker.lorem.sentences(Math.floor(Math.random() * 4)),
      };

      const createdMood = await Mood.create(moodData);

      // attach mood to current user
      await User.findByIdAndUpdate(
        { _id: createdUsers[i]._id },
        { $push: { moods: createdMood._id } },
        { new: true }
      );
    }

    console.log(
      `${moodCount} created for ${createdUsers[i].firstName} ${createdUsers[i].lastName}`
    );
  }

  console.log(`${userCount} users with ${moodCount} moods logged each.`);

  process.exit(0);
});
