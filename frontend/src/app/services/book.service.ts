import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // Get all books
  getAllBooks(): Observable<any> {
    return this.http.get(`${this.baseUrl}/books`);
  }

  // Get single book by ID
  getBookById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/books/${id}`);
  }

  // Borrow a book
  borrowBook(userName: string, bookId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/borrow`, {
      userName,
      bookId
    });
  }

  // Return a book
  returnBook(userName: string, bookId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/borrow/return`, {
      userName,
      bookId
    });
  }

  // Get all borrowed books
  getBorrowedBooks(): Observable<any> {
    return this.http.get(`${this.baseUrl}/borrow/borrowed`);
  }
}
