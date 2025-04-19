import { Router } from 'express';
import {
  fetchAllBooks,
  fetchBookById,
  addBook,
  updateBook,
  deleteBook
} from '../controllers/book.controller';

const router = Router();

router.get('/', fetchAllBooks); 
router.get('/:id', fetchBookById);
router.post('/', addBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

export default router;
