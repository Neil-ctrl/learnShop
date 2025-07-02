DROP TABLE IF EXISTS fruits;

CREATE TABLE fruits (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(50),
    quantity INT,
    price INT
);

INSERT INTO fruits (name, quantity, price) VALUES
('Apple', 5, 10),
('Banana', 7, 15),
('Kiwi', 2, 12),
('Mango', 3, 20),
('Papaya', 4, 25);