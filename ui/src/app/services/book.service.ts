import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Book} from "../common/book.component";
import {Category} from "../common/category.component";
import {Author} from "../common/author.component";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private bookUrl = "http://localhost:3001/book";
  private categoryUrl = "http://localhost:3001/category";
  private authorUrl = "http://localhost:3001/author";
  constructor(private httpClient: HttpClient) { }

  private getBooksList (url: string): Observable<{ [key: string]: Book }> {
    return this.httpClient.get<any>(this.bookUrl + url)
      .pipe(map(response => response));
  }
  getBooks = (title: string, categoryId: string, authorId: string): Observable<{ [key: string]: Book }> => {
    return this.getBooksList(`?title=${title}` + "&" + `author=${authorId}` + "&" + `category=${categoryId}`);
  }

  getCategories = (): Observable<{ [key: string]: Category }> => this.httpClient.get<any>(this.categoryUrl)
    .pipe(map(response  => response));

  getAuthors = (): Observable<{ [key: string]: Author }> => this.httpClient.get<any>(this.authorUrl)
      .pipe(map(response => response));

}



