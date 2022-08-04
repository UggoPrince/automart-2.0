/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
const { users } = require('../seeders/users');

module.exports = {
  async up(db) {
    await db.collection('users').insertMany(users); // .updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
  },

  async down(db) {
    await db.collection('users').drop(); //.updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  },
};
