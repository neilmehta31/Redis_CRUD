CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255)
);

INSERT INTO users (name, email) VALUES ('Rajath Shetty', 'rajathshetty20@gmail.com');