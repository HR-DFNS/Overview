--postgres -s -D /usr/local/var/postgres
--psql wegot bmblumenfeld

DROP TABLE restaurants;

CREATE TABLE restaurants (                                                               
id int,
name varchar(200),
tagline varchar(200),
type varchar(15),
vicinity varchar(200),
priceLevel int,
zagatFood real,
zagatDecor real,
zagatService real,
longDescription varchar(500)
);

ALTER SYSTEM SET work_mem TO '128MB';

ALTER SYSTEM SET max_wal_senders TO '0';

ALTER SYSTEM SET archive_mode TO 'false';

ALTER SYSTEM SET wal_level TO 'minimal';

ALTER SYSTEM SET max_wal_size TO '4GB';

COPY restaurants FROM '/Users/clinkleadmin/Documents/HR90/SDC/Overview/psqlData.csv' DELIMITER ',' CSV HEADER;

-- CREATE UNIQUE INDEX CONCURRENTLY ON restaurants (id);
