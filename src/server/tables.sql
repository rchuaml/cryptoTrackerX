DROP TABLE users;
DROP TABLE coins;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT,
  password TEXT,
  timestamp_col TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS coins (
  id SERIAL PRIMARY KEY,
  owner_id INTEGER,
  symbol TEXT,
  buyprice INTEGER,
  logo TEXT,
  coinId INTEGER,
  timestamp_col TIMESTAMP DEFAULT now()
);

INSERT INTO users (username, password)VALUES ('ronnie' , '7dbf397cf3c52c5045e892fe2fa12c39eccc26c772d0e99bb28750fa95b0c1c1');