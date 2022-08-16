const cars1 = [
  {
    owner: 1,
    state: 'new',
    status: 'sold',
    price: 15000000,
    title: 'Brand new G-Wagon',
    manufacturer: 'mercedes',
    model: 'g-wagon',
    bodyType: 'SUV',
    imageUrl: 'https://res.cloudinary.com/dya3r9cfe/image/upload/v1558624490/c1.jpg',
  },
  {
    owner: 1,
    state: 'new',
    status: 'available',
    price: 6000000,
    title: 'New venza on sale.',
    manufacturer: 'toyota',
    model: 'venza',
    bodyType: 'SUV',
    imageUrl: 'https://res.cloudinary.com/dya3r9cfe/image/upload/v1558624479/c9.jpg',
  },
  {
    owner: 1,
    state: 'used',
    status: 'available',
    price: 9000000,
    title: 'Ford truck. Buy now while still available.',
    manufacturer: 'toyota',
    model: 'Fond Pickup Truck',
    bodType: 'Truck',
    imageUrl: 'https://res.cloudinary.com/dya3r9cfe/image/upload/v1558617991/c14.png',
  },
];

const cars2 = [
  {
    owner: 2,
    state: 'used',
    status: 'sold',
    price: 14000000,
    title: 'Belgium Mack for sale.',
    manufacturer: 'Mack',
    model: 'Mack 209',
    bodyType: 'Trailer',
    imageUrl: 'https://res.cloudinary.com/dya3r9cfe/image/upload/v1558624761/c8.jpg',
  },
  {
    owner: 2,
    state: 'new',
    status: 'available',
    price: 16000000.0,
    title: 'New Mercedes truck',
    manufacturer: 'Mercedes',
    model: 'Mercedes 455',
    bodyType: 'Trailer',
    imageUrl: 'https://res.cloudinary.com/dya3r9cfe/image/upload/v1558624904/c2.jpg',
  },
];

module.exports = { cars1, cars2 };
