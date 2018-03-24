const { Client } = require('pg')

const client = new Client({
  user: 'clinkleadmin',
  host: 'localhost',
  database: 'wegot',
  port: 5432,
})

// const client = new Client({
//   user: 'postgres',
//   host: '18.216.37.254',
//   database: 'template1',
//   port: 5432,
// })

client.connect()

const findOneById = (id, callback) => {
  client.query(`SELECT * FROM restaurants WHERE id=${id}`,callback)
};

exports.findOneById = findOneById;
