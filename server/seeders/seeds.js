const db = require('../config/connection');
const { User, Mood } = require('../models');
const { faker } = require('@faker-js/faker');
const dayjs = require('dayjs');

db.once('open', async () => {
  await User.deleteMany({});
  await Mood.deleteMany({});

  // specify number of users and moods per user to generate
  const userCount = 5;
  const moodCount = 90;

  // generate users
  const users = await createUsers(userCount);
  console.log(`${userCount} users successfully created.`);

  // loop through users and generate mood charts for each
  for (let i = 0; i < users.length; i++) {
    await createMoods(moodCount, users[i]);

    console.log(
      `${moodCount} mood charts created for ${users[i].firstName} ${users[i].lastName}`
    );
  }

  // notify success and close db connection
  console.log(`${userCount} users created with ${moodCount} moods logged each.`);
  process.exit(0);
});

async function createUsers(userCount) {
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

  return createdUsers;
}

async function createMoods(moodCount, user) {
  // set current date as starting point for generating daily mood charts
  let currentDate = dayjs('2022-03-25 00:00:00');
  
  // generate random number of symptoms to add to each mood chart
  const symptomCount = Math.floor(Math.random() * 6);

  // complete symptom array
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

  // generate mood charts
  for (let j = 0; j <= moodCount; j++) {
    // set to previous date
    currentDate = dayjs(currentDate).subtract(1, 'day');

    // shuffle symptoms array
    const shuffledSymptoms = symptoms.sort((a, b) => 0.5 - Math.random());
    const currentSymptoms = [];

    // push random number of symptoms into chart's symptoms array
    for (let k = 0; k <= symptomCount; k++) {
      currentSymptoms.push(shuffledSymptoms[k]);
    }

    // create and save individual mood chart to database
    const moodData = {
      date: currentDate,
      mood: faker.datatype.number({ min: 1, max: 5 }),
      anxiety: faker.datatype.number({ min: 0, max: 3 }),
      insomnia: faker.datatype.number({ min: 0, max: 3 }),
      panicAttacks: Math.floor(Math.random() * 3),
      symptoms: currentSymptoms,
      accomplishments: faker.lorem.sentences(Math.floor(Math.random() * 4)),
      notes: faker.lorem.sentences(Math.floor(Math.random() * 4)),
    };

    const createdMood = await Mood.create(moodData);

    // attach mood to current user
    await User.findByIdAndUpdate(
      { _id: user._id },
      { $push: { moods: createdMood._id } },
      { new: true }
    );
  }
} 