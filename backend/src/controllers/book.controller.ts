import { RequestHandler } from 'express';
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBookById,
  deleteBookById,
} from '../models/book.model';

export const fetchAllBooks: RequestHandler = async (_req, res) => {
  try {
    const books = await getAllBooks();
    res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Error fetching books' });
  }
};

export const fetchBookById: RequestHandler = async (req, res) => {
  try {
    const book = await getBookById(parseInt(req.params.id));
    if (!book) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }
    res.status(200).json(book);
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ message: 'Error fetching book' });
  }
};

export const addBook: RequestHandler = async (req, res) => {
  try {
    const { title, author, image_url } = req.body;
    const newBook = await createBook(title, author, image_url);
    res.status(201).json({ message: 'Book added successfully', newBook });
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).json({ message: 'Error adding book' });
  }
};

export const updateBook: RequestHandler = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { title, author, image_url } = req.body;
    const updated = await updateBookById(id, title, author, image_url);
    res.status(200).json({ message: 'Book updated', updated });
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ message: 'Error updating book' });
  }
};

export const deleteBook: RequestHandler = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deleted = await deleteBookById(id);
    res.status(200).json({ message: 'Book deleted', deleted });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ message: 'Error deleting book' });
  }
};
