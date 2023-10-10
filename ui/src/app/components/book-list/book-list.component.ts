import {Component, OnInit} from '@angular/core';
import {Book} from "../../common/book.component";
import {BookService} from "../../services/book.service";
import {ActivatedRoute} from "@angular/router";
import {Category} from "../../common/category.component";
import {Author} from "../../common/author.component";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit{
  constructor(
    private bookService: BookService,
    private activatedRoute: ActivatedRoute
  ) {}

  Books: { [key: string]: Book } ;
  Authors: { [key: string]: Author };
  Categories: { [key: string]: Category };

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(()=> {
      this.listBooks();
      this.listBookAuthors();
      this.listBookCategories();
    });

  }

  listBooks() {
    let title: string = this.activatedRoute.snapshot.queryParams['title'] || "";
    let author: string = this.activatedRoute.snapshot.queryParams['author'] || "";
    let category: string = this.activatedRoute.snapshot.queryParams['category'] || "";
    this.bookService.getBooks(title, author, category).subscribe(({
      next: (data) => this.Books = data,
      error:  (error) => console.log("Error fetching books data: ", error)
    }));
  }

  listBookCategories()  {
    this.bookService.getCategories().subscribe({
      next: (data) => this.Categories = data,
      error:  (error) => console.log('Error fetching category: ', error),
    })
  }

  listBookAuthors() {
    this.bookService.getAuthors().subscribe({
      next: (data) => this.Authors = data,
      error:  (error) => console.log('Error fetching category: ', error),
    })
  }


}
