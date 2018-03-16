const mongoose = require('mongoose');
const db = require('./db/db.js');
const fs = require('fs');
const faker = require('faker');


const dbAddress = process.env.DB_ADDRESS || 'localhost';

// mongoose.connect(`mongodb://${dbAddress}/weGotData`);




const seedDb = () => {
  // db.count().then((counts) => {
  //   if (counts === 0) {
  // const outputDBConfig = { dbURL : "mongodb://localhost:27017/weGotData", collection : "devTestOutput" }

      for (var i = 0; i < 1000000; i++) {

        var overviewData = JSON.stringify({
          id: i + '',
          name:faker.random.words(),
          tagline: faker.lorem.sentence(),
          type: 'Restaurant',
          vicinity: faker.address.streetAddress() + ', ' + faker.address.city(),
          priceLevel: Math.floor(Math.random() * 3 + 1),
          zagatFood: Math.round(Math.random() * 5),
          zagatDecor: Math.round(Math.random() * 5),
          zagatService: Math.round(Math.random() * 5),
          longDescription: faker.lorem.paragraph()
        }) + '\n';

      file.write(overviewData)
      }
      file.end(()=>{
        //time of end exection
        console.log('done')
      })
      // db.insertMany(collection, () => {
      //   console.log('done seeding!');
      //   mongoose.disconnect();
      // });
  //   } else {
  //     console.log('already seeded!');
  //     mongoose.disconnect();
  //   }
  // });

};


// function writeOneMillionTimes(writer, data, callback) {

//   let i = 10000000;
//   write();
//   function write() {
//     let ok = true;
//     do {
//       i--;
//       if (i === 0) {
//         // last time!
//         writer.write(data, callback);
//       } else {
//         // see if we should continue, or wait
//         // don't pass the callback, because we're not done yet.
//         ok = writer.write(data);
//       }
//     } while (i > 0 && ok);
//     if (i > 0) {
//       // had to stop early!
//       // write some more once it drains
//       writer.once('drain', write);
//     }
//   }
// }

const file = fs.createWriteStream('./faked1.json');

function seed(writer, callback) {

  let i = 10000001;
  let randomData = function (id) {
    return JSON.stringify({
      id: id + '',
      name:faker.random.words(),
      tagline: faker.lorem.sentence(),
      type: 'Restaurant',
      vicinity: faker.address.streetAddress() + ', ' + faker.address.city(),
      priceLevel: faker.random.number(4),
      zagatFood: faker.finance.amount(0,5,2),
      zagatDecor: faker.finance.amount(0,5,2),
      zagatService: faker.finance.amount(0,5,2),
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

// const overviewInfo = data.map(({ result }) => (
//         {
//           id: result.place_id,
//           name: result.name,
//           tagline: result.tagline,
//           type: 'Restaurant',
//           vicinity: result.vicinity,
//           priceLevel: result.price_level,
//           zagatFood: Number(result.zagat_food),
//           zagatDecor: Number(result.zagat_decor),
//           zagatService: Number(result.zagat_service),
//           longDescription: result.long_description,
//         }
//       ));
// seedDb();
