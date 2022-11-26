const phoneNumber = '09023219677';
const users = [
  {
    firstName: 'john',
    lastName: 'doe',
    email: 'johndoe@gmail.com',
    password: 'Doe$123456',
    address: 'no 55 ikorodu road',
    isAdmin: true,
    phoneNumber,
  },
  {
    firstName: 'sarah',
    lastName: 'conoh',
    email: 'sarahconoh@gmail.com',
    password: 'Conoh@123456',
    address: 'no 56 ibadan road',
    isAdmin: false,
    phoneNumber,
  },
  {
    firstName: 'brian',
    lastName: 'emeka',
    email: 'brianemeka@gmail.com',
    password: 'Emeka@123456',
    address: 'no 10 rumuokoro road',
    isAdmin: false,
    phoneNumber,
  },
];

module.exports = { users };
