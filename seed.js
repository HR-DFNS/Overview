const mongoose = require('mongoose');
const db = require('./db/mongodb.js');
const fs = require('fs');
const faker = require('faker');

const file = fs.createWriteStream('./fakedId.json');

function seed(writer, callback) {

  let i = 10000001;
  let randomData = function (id) {
    return JSON.stringify({
      _id: id,
      name:faker.random.words(),
      tagline: faker.lorem.sentence(),
      type: 'Restaurant',
      vicinity: faker.address.streetAddress() + ', ' + faker.address.city(),
      priceLevel: Number(faker.random.number(4)),
      zagatFood: Number(faker.finance.amount(0,5,2)),
      zagatDecor: Number(faker.finance.amount(0,5,2)),
      zagatService: Number(faker.finance.amount(0,5,2)),
      longDescription: faker.lorem.paragraph()
    }) + '\n';
  }
  write();
  function write() {
    let ok = true;
    do {
      i--;
      let data = randomData(i)
      if (i === 0) {
        // last time!
        writer.write(data, callback);
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write(data);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  }
}




seed(file,function () {
  console.log('done');
})


