import {Injectable} from '@angular/core';
import {firstValueFrom, map, Observable} from "rxjs";
import {Book} from "../common/common.component";
import {Category} from "../common/common.component";
import {Author} from "../common/common.component";
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

    borrowBook(data: any): Observable<any> {

      return this.httpClient.post(this.ticketUrl, data, {'headers': this.createAuthorizationHeader()})
        .pipe(map(response => response));
    }
}

interface listBook {
    list: { [p: string]: Book },
    numberOfPage: any
}

