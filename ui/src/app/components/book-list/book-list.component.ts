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
export class BookListComponent implements OnInit {
    Books: { [key: string]: Book };
    Authors: { [key: string]: Author };
    Categories: { [key: string]: Category };

    constructor(
        private bookService: BookService,
        private activatedRoute: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe(() => {
            this.listBookAuthors()
            this.listBookCategories()
            this.listBooks();

        });

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
            // this.bookService.getBooks("", "", "").subscribe(({
            //     next: (data) => this.Books = data,
            //     error: (error) => console.log("Error fetching books data: ", error)
            // }));

            this.Books = await this.bookService.getBooks(title, author, category);
        } catch (e) {
            console.log("Error fetching authors:", e);
        }
    }
}

