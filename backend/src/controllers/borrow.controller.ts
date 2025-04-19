import { RequestHandler } from 'express';
import { db } from '../config/db';
import { RowDataPacket } from 'mysql2';

// 📚 Borrow a book
export const handleBorrow: RequestHandler = async (req, res) => {
  try {
    const { userName, bookId } = req.body;

    if (!userName || !userName.trim() || !bookId) {
      res.status(400).json({ message: 'User name and book ID are required' });
      return;
    }

    const [userRows] = await db.promise().query<RowDataPacket[]>(
      'SELECT id FROM users WHERE name = ?',
      [userName.trim()]
    );

    if (userRows.length === 0) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const userId = userRows[0].id;

    const [bookRows] = await db.promise().query<RowDataPacket[]>(
      'SELECT available FROM books WHERE id = ?',
      [bookId]
    );

    if (bookRows.length === 0) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }

    if (bookRows[0].available === 0) {
      res.status(400).json({ message: 'Book is not available for borrowing' });
      return;
    }

    await db.promise().query(
      'INSERT INTO borrowed_books (book_id, user_id) VALUES (?, ?)',
      [bookId, userId]
    );

    await db.promise().query(
      'UPDATE books SET available = 0 WHERE id = ?',
      [bookId]
    );

    res.status(200).json({ message: `Book borrowed successfully by ${userName}` });
  } catch (error) {
    console.error('Error in handleBorrow:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// 🔄 Return a book
export const handleReturnBook: RequestHandler = async (req, res) => {
  try {
    const { userName, bookId } = req.body;

    if (!userName || !userName.trim() || !bookId) {
      res.status(400).json({ message: 'User name and book ID are required' });
      return;
    }

    const [userRows] = await db.promise().query<RowDataPacket[]>(
      'SELECT id FROM users WHERE name = ?',
      [userName.trim()]
    );

    if (userRows.length === 0) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const userId = userRows[0].id;

    await db.promise().query(
      'DELETE FROM borrowed_books WHERE book_id = ? AND user_id = ?',
      [bookId, userId]
    );

    await db.promise().query(
      'UPDATE books SET available = 1 WHERE id = ?',
      [bookId]
    );

    res.status(200).json({ message: `Book returned successfully by ${userName}` });
  } catch (error) {
    console.error('Error in handleReturnBook:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// 📄 Get all borrowed books with user and book info
// 📄 Get all borrowed books with user and book info
export const getBorrowedBooks: RequestHandler = async (_req, res) => {
  try {
    const [rows] = await db.promise().query<RowDataPacket[]>(`
      SELECT 
        b.id AS bookId,
        b.title AS bookTitle,
        b.author,
        u.name AS userName,
        bb.borrowed_at
      FROM borrowed_books bb
      JOIN books b ON bb.book_id = b.id
      JOIN users u ON bb.user_id = u.id
    `);

    res.status(200).json(rows);
  } catch (error) {
    console.error('Error in getBorrowedBooks:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
