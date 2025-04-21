import { db } from '../config/db';
import { RowDataPacket } from 'mysql2';

// ✅ Get all books with joined book details
export const getAllBooks = (): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT 
         b.id, b.title, b.author, b.available, b.image_url,
         bd.genre, bd.publication_year, bd.isbn, bd.language, bd.pages, bd.summary
       FROM books b
       LEFT JOIN book_details bd ON b.id = bd.book_id`,
      (err, results) => {
        if (err) return reject(err);

        const books = (results as RowDataPacket[]).map(row => ({
          id: row.id,
          title: row.title,
          author: row.author,
          available: row.available,
          image_url: row.image_url, // ✅ Include image_url
          book_details: {
            genre: row.genre,
            publication_year: row.publication_year,
            isbn: row.isbn,
            language: row.language,
            pages: row.pages,
            summary: row.summary,
          }
        }));

        resolve(books);
      }
    );
  });
};

// ✅ Get one book by ID with details
export const getBookById = (id: number): Promise<any> => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT 
         b.id, b.title, b.author, b.available, b.image_url,
         bd.genre, bd.publication_year, bd.isbn, bd.language, bd.pages, bd.summary
       FROM books b
       LEFT JOIN book_details bd ON b.id = bd.book_id
       WHERE b.id = ?`,
      [id],
      (err, results) => {
        if (err) return reject(err);

        const rows = results as RowDataPacket[];
        if (rows.length === 0) return resolve(null);

        const book = rows[0];

        resolve({
          id: book.id,
          title: book.title,
          author: book.author,
          available: book.available,
          image_url: book.image_url, // ✅ Include image_url
          book_details: {
            genre: book.genre,
            publication_year: book.publication_year,
            isbn: book.isbn,
            language: book.language,
            pages: book.pages,
            summary: book.summary,
          }
        });
      }
    );
  });
};

// ✅ Update availability
export const updateBookAvailability = (id: number, available: boolean): Promise<any> => {
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE books SET available = ? WHERE id = ?',
      [available, id],
      (err, results) => {
        if (err) return reject(err);
        resolve(results);
      }
    );
  });
};

// ✅ Create a new book (with optional image)
export const createBook = (
  title: string,
  author: string,
  image_url: string = ''
): Promise<any> => {
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO books (title, author, available, image_url) VALUES (?, ?, ?, ?)',
      [title, author, true, image_url],
      (err, results) => {
        if (err) return reject(err);
        resolve(results);
      }
    );
  });
};

// ✅ Update a book (including image)
export const updateBookById = (
  id: number,
  title: string,
  author: string,
  image_url: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE books SET title = ?, author = ?, image_url = ? WHERE id = ?',
      [title, author, image_url, id],
      (err, results) => {
        if (err) return reject(err);
        resolve(results);
      }
    );
  });
};

// ✅ Delete a book
export const deleteBookById = (id: number): Promise<any> => {
  return new Promise((resolve, reject) => {
    db.query(
      'DELETE FROM books WHERE id = ?',
      [id],
      (err, results) => {
        if (err) return reject(err);
        resolve(results);
      }
    );
  });
};
