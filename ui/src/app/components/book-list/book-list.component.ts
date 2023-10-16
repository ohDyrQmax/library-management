import {Component, OnInit} from '@angular/core';
import {Book} from "../../common/book.component";
import {BookService} from "../../services/book.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Category} from "../../common/category.component";
import {Author} from "../../common/author.component";
import * as moment from "moment";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {now} from "moment";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  Books: { [key: string]: Book };
  Authors: { [key: string]: Author };
  Categories: { [key: string]: Category };
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private bookService: BookService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    this.form = this.fb.group({
      borrowedDate: ['', Validators.required],
      expectReturnDate: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(() => {
      this.listBookAuthors()
        .then(() => this.listBookCategories())
        .finally(() => this.listBooks());
    });

  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
  getToday(): string {
    return new Date().toISOString().split('T')[0]
  }
  async listBookAuthors() {
    try {
      this.Authors = await this.bookService.getAuthors();
    } catch (e) {
      console.log('Error fetching authors: ', e)
    }
  }
  async listBookCategories() {
    try {
      this.Categories = await this.bookService.getCategories();
    } catch (e) {
      console.log("Error fetching categories:", e);
    }
  }
  async listBooks() {
    try {
      let title: string = this.activatedRoute.snapshot.queryParams['title'] || "";
      let author: string = this.activatedRoute.snapshot.queryParams['author'] || "";
      let category: string = this.activatedRoute.snapshot.queryParams['category'] || "";
      this.Books = await this.bookService.getBooks(title, author, category);
    } catch (e) {
      console.log("Error fetching authors:", e);
    }
  }
  createTicket(bookId: string): void {
    if (!this.isLoggedIn()) {
      alert("You can only borrow book after logging in an existing account.");
      return;
    }
    this.bookService.borrowBook(bookId).subscribe(({
      next: data => {
        alert("Successfully create ticket.");
        this.router.navigateByUrl("/books")
          .then(r => window.location.reload())
      },
      error: err => {
        alert(`Error creating ticket: ${err.error.error || err.error.message}`);
      }
    }));
  }
  protected readonly now = now;
  protected readonly moment = moment;
}

