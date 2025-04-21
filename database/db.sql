DROP DATABASE library;
CREATE DATABASE IF NOT EXISTS library;
USE library;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

INSERT INTO users (name) VALUES
  ('Alice'),
  ('Bob'),
  ('Charlie'),
  ('Dharaneesh'),
  ('Kishore'),
  ('Abi');

CREATE TABLE IF NOT EXISTS books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  available BOOLEAN DEFAULT TRUE,
  image_url VARCHAR(255)
);

INSERT INTO books (title, author, available, image_url) VALUES
('The Great Gatsby', 'F. Scott Fitzgerald', TRUE, 'https://m.media-amazon.com/images/I/41LfbREAeyL._SX342_SY445_.jpg'),
('To Kill a Mockingbird', 'Harper Lee', TRUE, 'https://m.media-amazon.com/images/I/51Z9p5AecCL._SY445_SX342_.jpg'),
('1984', 'George Orwell', TRUE, 'https://m.media-amazon.com/images/I/81fcLJo+FNL._SY385_.jpg'),
('Pride and Prejudice', 'Jane Austen', TRUE, 'https://m.media-amazon.com/images/I/81TQOz15C0L._SY342_.jpg'),
('Moby Dick', 'Herman Melville', TRUE, 'https://m.media-amazon.com/images/I/51UVp8-EIeS._SX342_SY445_.jpg'),
('The Catcher in the Rye', 'J.D. Salinger', TRUE, 'https://m.media-amazon.com/images/I/7108sdEUEGL._SL1500_.jpg'),
('Brave New World', 'Aldous Huxley', TRUE, 'https://m.media-amazon.com/images/I/41MFJPAunjL._SX342_SY445_.jpg'),
('The Odyssey', 'Homer', TRUE, 'https://m.media-amazon.com/images/I/61VCpRxu3fL._SX342_SY445_.jpg'),
('The Hobbit', 'J.R.R. Tolkien', TRUE, 'https://m.media-amazon.com/images/I/71jKeGU9nKL._SY522_.jpg'),
('The Lord of the Rings', 'J.R.R. Tolkien', TRUE, 'https://m.media-amazon.com/images/I/51myt0GXIUL._SY445_SX342_.jpg'),
('Anna Karenina', 'Leo Tolstoy', TRUE, 'https://m.media-amazon.com/images/I/81MGByQHUBL.SL1500.jpg'),
('War and Peace', 'Leo Tolstoy', TRUE, 'https://m.media-amazon.com/images/I/71eK3ri8ROL.SL1000.jpg'),
('Les Misérables', 'Victor Hugo', TRUE, 'https://m.media-amazon.com/images/I/71gXwwqb+LL.SL1500.jpg'),
('Crime and Punishment', 'Fyodor Dostoevsky', TRUE, 'https://m.media-amazon.com/images/I/81d-GOsc78L.SL1500.jpg'),
('Dracula', 'Bram Stoker', TRUE, 'https://m.media-amazon.com/images/I/611HxajTczL.SL1500.jpg'),
('The Picture of Dorian Gray', 'Oscar Wilde', TRUE, 'https://m.media-amazon.com/images/I/71QOl0oBI+L.SL1000.jpg'),
('Frankenstein', 'Mary Shelley', TRUE, 'https://m.media-amazon.com/images/I/51UJnNos7HL._SX342_SY445_.jpg'),
('The Brothers Karamazov', 'Fyodor Dostoevsky', TRUE, 'https://m.media-amazon.com/images/I/81ES-ZV3j9L.SL1500.jpg'),
('Fahrenheit 451', 'Ray Bradbury', TRUE, 'https://m.media-amazon.com/images/I/81mUfc+x9kL.SL1500.jpg'),
('The Divine Comedy', 'Dante Alighieri', TRUE, 'https://m.media-amazon.com/images/I/81IgKZdePtL._AC_UY327_FMwebp_QL65_.jpg');

CREATE TABLE IF NOT EXISTS book_details (
  id INT AUTO_INCREMENT PRIMARY KEY,
  book_id INT NOT NULL,
  genre VARCHAR(100),
  publication_year INT,
  isbn VARCHAR(20),
  language VARCHAR(50),
  pages INT,
  summary TEXT,
  FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
);

INSERT INTO book_details (book_id, genre, publication_year, isbn, language, pages, summary) VALUES
  (1, 'Classic', 1925, '9780743273565', 'English', 180, 'A novel set in the Jazz Age that explores themes of decadence, idealism, and excess.'),
  (2, 'Historical Fiction', 1960, '9780061120084', 'English', 281, 'A young girl grows up in the racially charged Deep South and learns about justice and compassion.'),
  (3, 'Dystopian', 1949, '9780451524935', 'English', 328, 'A chilling tale of a totalitarian regime that uses surveillance and propaganda to control society.'),
  (4, 'Romance', 1813, '9780141439518', 'English', 279, 'A witty and romantic novel about the manners and matrimonial machinations among the British gentry.'),
  (5, 'Adventure', 1851, '9781503280786', 'English', 635, 'An epic tale of obsession and revenge as Captain Ahab hunts the great white whale, Moby Dick.'),
  (6, 'Fiction', 1951, '9780316769488', 'English', 277, 'The story of Holden Caulfield, a teenager who leaves his prep school and wanders New York City.'),
  (7, 'Dystopian', 1932, '9780060850524', 'English', 311, 'A world where the government controls every aspect of life and eliminates any form of rebellion.'),
  (8, 'Epic Poetry', -800, '9780140268867', 'Greek', 541, 'Homer’s epic poem about the adventures of Odysseus as he attempts to return home after the Trojan War.'),
  (9, 'Fantasy', 1937, '9780345339683', 'English', 310, 'A fantasy novel about the journey of Bilbo Baggins as he embarks on a quest to reclaim treasure from a dragon.'),
  (10, 'Fantasy', 1954, '9780544003415', 'English', 1178, 'A trilogy that follows the journey of Frodo Baggins to destroy the One Ring and save Middle-earth.'),
  (11, 'Romance', 1877, '9780486437919', 'Russian', 864, 'A complex narrative about Anna Karenina’s tragic love affair with Count Vronsky, set against the backdrop of Russian society.'),
  (12, 'Historical Fiction', 1869, '9780140447934', 'Russian', 1225, 'A story set during the Napoleonic Wars, focusing on several aristocratic families.'),
  (13, 'Historical Fiction', 1862, '9780140444308', 'French', 1232, 'A sweeping tale of love, suffering, and redemption in post-revolutionary France.'),
  (14, 'Psychological Fiction', 1866, '9780486450727', 'Russian', 671, 'The mental anguish of a man who is planning a crime and dealing with his inner moral conflict.'),
  (15, 'Horror', 1897, '9780141439471', 'English', 416, 'A gothic novel about a vampire who preys on young women, and the battle to stop him.'),
  (16, 'Philosophical Fiction', 1890, '9780141439570', 'English', 254, 'A novel about a young man’s quest to immortalize his beauty while living a hedonistic life.'),
  (17, 'Gothic Fiction', 1818, '9780486282114', 'English', 280, 'A story about a scientist who creates a monster that leads to his downfall.'),
  (18, 'Philosophical Fiction', 1880, '9780486453919', 'Russian', 796, 'A story of moral and spiritual awakening of a man on trial for the murder of his father.'),
  (19, 'Dystopian', 1953, '9781451673319', 'English', 158, 'A future where books are banned, and firemen burn them. The story follows Montag, a fireman who begins to question his role.'),
  (20, 'Epic Poetry', 1320, '9780140449154', 'Italian', 798, 'Dante Alighieri’s allegorical poem about the journey through Hell, Purgatory, and Heaven.');

CREATE TABLE IF NOT EXISTS borrowed_books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  book_id INT NOT NULL,
  user_id INT NOT NULL,
  borrowed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (book_id) REFERENCES books(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

SELECT * FROM borrowed_books;
SELECT title, image_url FROM books;
SELECT id, title, image_url FROM books ORDER BY id;
