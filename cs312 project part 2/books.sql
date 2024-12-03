CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    genre VARCHAR(255),
    format ENUM('Hardcover', 'Paperback') NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

