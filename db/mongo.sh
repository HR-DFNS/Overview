#mongo
#checkout db
use weGotData
#drop database
db.dropDatabase();
#import from a json file that creates a db named weGotData and a collection restaurants
mongoimport --db weGotData --collection restaurants --file /Users/clinkleadmin/Documents/HR90/SDC/Overview/faked1.json;
#create index
#db.restaurants.createIndex( { id: 1 } )