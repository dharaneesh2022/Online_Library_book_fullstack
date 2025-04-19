import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  book: any;
  userName: string = '';
  message: string = '';
  error: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    const bookId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadBook(bookId);
  }

  loadBook(bookId: number): void {
    this.bookService.getBookById(bookId).subscribe({
      next: (data) => {
        this.book = data;
      },
      error: () => {
        this.message = 'Failed to load book details';
        this.error = true;
      }
    });
  }

  borrowBook(): void {
    if (!this.userName.trim()) {
      this.message = 'Please enter your name.';
      this.error = true;
      return;
    }

    if (!this.book.available) {
      this.message = 'Book is unavailable.';
      this.error = true;
      return;
    }

    this.bookService.borrowBook(this.userName.trim(), this.book.id).subscribe({
      next: (res) => {
        this.message = res.message || 'Book borrowed successfully.';
        this.book.available = false; // 🔄 Update UI to show unavailability
        this.error = false;
      },
      error: (err) => {
        this.message = err.error.message || 'Failed to borrow the book';
        this.error = true;
      }
    });
  }
}
