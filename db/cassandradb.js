const cassandra = require('cassandra-driver');


var client = new cassandra.Client({
	contactPoints: ['127.0.0.1'],
	keyspace: 'wegot'
});

const findOneById = (id, callback) => {
	const query = `SELECT * FROM restaurants WHERE id=${id}`
	console.log(query);
  client.execute(`SELECT * FROM restaurants WHERE id='${id}'`,callback)
};

exports.findOneById = findOneById;