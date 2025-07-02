DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY NOT NULL,
    fname VARCHAR(255),
    lname VARCHAR(255),
    username VARCHAR(20),
    password VARCHAR(20),
    phone_number VARCHAR(10),
    isAdmin BOOLEAN
);

INSERT INTO users (fname, lname, username, password, phone_number, isAdmin) VALUES
('Neil', 'Chitale', 'neilc', 'pwd', '9284026955', TRUE),
('Aarush', 'Sengupta', 'aarushs', 'pwd', '0000000000', FALSE),
('Ira', 'Chitale', 'irac', 'passkey', '0000000000', FALSE),
('Ayush', 'Panwar', 'ayushp', 'pwd', '9407916962', FALSE);