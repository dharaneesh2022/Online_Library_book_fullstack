import { Router } from 'express';
import {
  handleBorrow,
  handleReturnBook,
  getBorrowedBooks
} from '../controllers/borrow.controller';

const router = Router();

router.post('/', handleBorrow);
router.post('/return', handleReturnBook);
router.get('/borrowed', getBorrowedBooks);

export default router;
