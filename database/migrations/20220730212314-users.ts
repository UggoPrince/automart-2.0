const { users } = require('../seeders/users');
const { cars1, cars2 } = require('../seeders/cars');

module.exports = {
  async up(db) {
    await db.collection('users').insertMany(users);
    const cars = [];
    const getUsers = await db.collection('users').find({}).toArray();
    cars1.map((car) => {
      car.owner = getUsers[0]._id;
      cars.push(car);
    });
    cars2.map((car) => {
      car.owner = getUsers[2]._id;
      cars.push(car);
    });
    await db.collection('cars').insertMany(cars);
  },

  async down(db) {
    await db.collection('users').drop();
    await db.collection('cars').drop();
  },
};
