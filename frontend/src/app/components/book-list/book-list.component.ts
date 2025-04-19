import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: any[] = [];

  constructor(
    private bookService: BookService,
    private router: Router
  ) {}

  ngOnInit() {
    this.bookService.getAllBooks().subscribe({
      next: (data) => {
        console.log('Books fetched:', data); // ✅ Debug log
        this.books = data;
      },
      error: (err) => {
        console.error('Error fetching books:', err); // ❌ Error log
      }
    });
  }

  navigateToBorrow(bookId: number) {
    this.router.navigate(['/borrow', bookId]);
  }
}
