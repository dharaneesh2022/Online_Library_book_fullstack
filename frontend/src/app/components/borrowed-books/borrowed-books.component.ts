import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-borrowed-books',
  templateUrl: './borrowed-books.component.html',
  styleUrls: ['./borrowed-books.component.css']
})
export class BorrowedBooksComponent implements OnInit {
  borrowedBooks: any[] = [];
  message: string = '';
  error: boolean = false;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBorrowedBooks();
  }

  loadBorrowedBooks(): void {
    this.bookService.getBorrowedBooks().subscribe({
      next: (data) => {
        this.borrowedBooks = data;
      },
      error: (err) => {
        console.error('Failed to fetch borrowed books', err);
      }
    });
  }

  returnBook(book: any): void {
    this.bookService.returnBook(book.userName, book.bookId).subscribe({
      next: (res: { message: string }) => {
        this.message = res.message || 'Book returned successfully.';
        this.error = false;
        this.loadBorrowedBooks();
      },
      error: (err) => {
        console.error('Error returning book:', err);
        this.message = err.error?.message || 'Failed to return the book';
        this.error = true;
      }
    });
  }
}
