import { db } from '../config/db';

// Get user ID by name
export const getUserIdByName = (userName: string) => {
  return db.promise().query('SELECT id FROM users WHERE name = ?', [userName]);
};

// Get the first available book
export const getAvailableBook = () => {
  return db.promise().query('SELECT id FROM books WHERE available = TRUE LIMIT 1');
};

// Insert borrow record
export const insertBorrowRecord = (book_id: number, user_id: number) => {
  return db.promise().query(
    'INSERT INTO borrowed_books (book_id, user_id) VALUES (?, ?)',
    [book_id, user_id]
  );
};

// Update book availability (true = borrowed/unavailable)
export const updateBookAvailability = (book_id: number, borrowed: boolean) => {
  return db.promise().query(
    'UPDATE books SET available = ? WHERE id = ?',
    [!borrowed, book_id]
  );
};

// Get all borrowed books with user names
export const getAllBorrowedBooks = () => {
  return db.promise().query(`
    SELECT 
      b.id AS book_id,
      b.title,
      b.author,
      u.name AS borrower,
      bb.borrowed_at
    FROM borrowed_books bb
    JOIN books b ON bb.book_id = b.id
    JOIN users u ON bb.user_id = u.id
  `);
};

// Delete a borrow record when returning
export const deleteBorrowRecord = (book_id: number, user_id: number) => {
  return db.promise().query(
    'DELETE FROM borrowed_books WHERE book_id = ? AND user_id = ?',
    [book_id, user_id]
  );
};
