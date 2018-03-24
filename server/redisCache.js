const redis = require('redis');
const r = require('./routes/requestHandler.js')
const mongodb = require('./../db/mongodb.js');
//come back to this asap
async function cacheTopRated () {
	let topRated;
	let topRatedIds = [];
	async function dbCall () {
		mongodb.getTopRated((err,data) => {
		  if (err) {
		    console.log(err)	
		  } else {
		  		topRated = data
		  		topRated.forEach(function(element){
		  		topRatedIds.push(element.id)
				})
		  }	
		})
	}
	await dbCall().then(()=>{
		return topRatedIds;
}) 

}

module.exports = {

	retreive: function (req, res, next) {
	  const restaurant = req.params.id;
	  r.client.get(restaurant, function (err, data) {
	    if (err) {
	    	throw err;
	    } 
	    if (data != null) {
	      res.send(respond(restaurant, data));
	    } else {
	      next();
	    }
		});
	},
	cache: function (data) {
		if ((data[0].priceLevel === 2) && ((data[0].zagatFood + data[0].zagatDecor + data[0].zagatService) / 3 >= 3.5)) {
			r.client.setex(`${data[0].id}`, 86400, `${data}`);
		}
	}
}
// console.log(cacheTopRated().then(console.log('cool')))
// module.exports = cacheTopRated;

