const db = require('../config/connection');
const { User, Mood } = require('../models');
const { faker } = require('@faker-js/faker');

db.once('open', async () => {
  await User.deleteMany({});
  await Mood.deleteMany({});

  const createdUsers = [];

  for (let i = 0; i < 3; i++) {
    const userData = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      // create random birthdays between 01-01-1952 and 01-01-2022
      birthday: faker.date.past(50, '2002-01-01'),
      avatar: faker.image.avatar(),
      password: '123456'
    };

    // save new user to database
    const user = await User.create(userData);

    // push new user into created users array
    createdUsers.push(user);
  };

  console.log(createdUsers);

  process.exit(0);
});