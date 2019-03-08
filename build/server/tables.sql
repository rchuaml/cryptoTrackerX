DROP TABLE users;
DROP TABLE coins;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT,
  password TEXT,
  timestamp_user TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS coins (
  id SERIAL PRIMARY KEY,
  owner_id INTEGER,
  name TEXT,
  symbol TEXT,
  buyprice DECIMAL,
  logo TEXT,
  cmcId INTEGER,
  qty DECIMAL DEFAULT 0,
  timestamp_coin TIMESTAMP DEFAULT now()
);

INSERT INTO users (username, password)VALUES ('ronnie' , '7dbf397cf3c52c5045e892fe2fa12c39eccc26c772d0e99bb28750fa95b0c1c1');