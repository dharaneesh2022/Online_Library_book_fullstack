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
  searchText: string = '';

  constructor(
    private bookService: BookService,
    private router: Router
  ) {}

  ngOnInit() {
    this.bookService.getAllBooks().subscribe({
      next: (data) => {
        const uniqueBooks = new Map<number, any>();
        data.forEach((book: any) => uniqueBooks.set(book.id, book));
        this.books = Array.from(uniqueBooks.values());

        console.log('Books fetched:', this.books.length);
        console.table(this.books);
      },
      error: (err) => {
        console.error('Error fetching books:', err);
      }
    });
  }

  filteredBooks() {
    const search = this.searchText.toLowerCase();
    return this.books.filter(book =>
      book.title.toLowerCase().includes(search) ||
      book.author.toLowerCase().includes(search)
    );
  }

  navigateToBorrow(bookId: number) {
    this.router.navigate(['/borrow', bookId]);
  }

  trackByBookId(index: number, book: any): number {
    return book.id;
  }
}
