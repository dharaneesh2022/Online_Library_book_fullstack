import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { AppComponent } from './app.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { BorrowedBooksComponent } from './components/borrowed-books/borrowed-books.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BookDetailsComponent } from './components/book-details/book-details.component'; // <-- ✅ Add this

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BorrowedBooksComponent,
    NavbarComponent,
    BookDetailsComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
