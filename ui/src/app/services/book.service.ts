import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {first, firstValueFrom} from "rxjs";
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

    constructor(private httpClient: HttpClient) {
    }

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
}

interface listBook {
    list: { [p: string]: Book },
    numberOfPage: any
}

