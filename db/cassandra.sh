#cassandra -f
#enter cassandra query language shell
cqlsh
#drop keyspace wegot if it exists
DROP KEYSPACE IF EXISTS wegot
#create keyspace. Might be a better config but this works for now
create keyspace wegot with replication = {'class':'SimpleStrategy','replication_factor':1};
#use keyspace
use wegot;
#drop table if exists
DROP TABLE IF EXISTS wegot.restaurants
#create table
create table restaurants (id varchar primary key,  name varchar, tagline varchar, type varchar, vicinity varchar, priceLevel int,zagatFood varchar, zagatDecor varchar, zagatService varchar, longDescription varchar);
#copy from csv file.Header allows ignored first line. delimeter is comma
COPY restaurants (id,name,tagline,type,vicinity,priceLevel,zagatFood,zagatDecor,zagatService,longDescription) FROM '/Users/clinkleadmin/Documents/HR90/SDC/Overview/psqlData.csv' WITH DELIMITER = ',' AND HEADER = TRUE;
