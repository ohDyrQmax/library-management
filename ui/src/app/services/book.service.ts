import {Injectable} from '@angular/core';
import {first, firstValueFrom, map, Observable} from "rxjs";
import {Book} from "../common/book.component";
import {Category} from "../common/category.component";
import {Author} from "../common/author.component";
import {BaseService} from "./base.service";

@Injectable({
    providedIn: 'root'
})
export class BookService extends BaseService{

    private bookUrl = "http://localhost:3001/book";
    private categoryUrl = "http://localhost:3001/category";
    private authorUrl = "http://localhost:3001/author";
    private ticketUrl = "http://localhost:3001/ticket";
    private async getBooksList(url: string): Promise<{ [key: string]: Book }> {
        return await firstValueFrom(this.httpClient.get<{ [key: string]: Book }>(this.bookUrl + url));
    }

    getBooks = (title: string, authorId: string, categoryId: string): Promise<{ [key: string]: Book }> =>
        this.getBooksList(`?title=${title}` + "&" + `author=${authorId}` + "&" + `category=${categoryId}`);


    getAuthors = async (): Promise<{ [key:string]: Author }> => await firstValueFrom(this.httpClient.get<{ [key:string]: Author }>(this.authorUrl));
    getCategories = async (): Promise<{ [key: string]: Category }> => await firstValueFrom(this.httpClient.get<{ [key: string]: Category }>(this.categoryUrl));


    // getCategories = (): Observable<{ [key: string]: Category }> => this.httpClient.get<any>(this.categoryUrl)
    //   .pipe(map(response  => response));
    //
    // getAuthors = (): Observable<{ [key: string]: Author }> => this.httpClient.get<any>(this.authorUrl)
    //     .pipe(map(response => response));

    borrowBook(bookId: string): Observable<any> {
      let currentUser = JSON.parse(localStorage.getItem("user"));
      let userId = currentUser._id;
      return this.httpClient.post(this.ticketUrl, {bookId: bookId, borrowerId: userId}, {'headers': this.createAuthorizationHeader()})
        .pipe(map(response => response));
    }
}

interface listBook {
    list: { [p: string]: Book },
    numberOfPage: any
}

