import {Injectable} from '@angular/core';
import {firstValueFrom} from "rxjs";
import {Book} from "../common/common.component";
import {BaseService} from "./base.service";

@Injectable({
    providedIn: 'root'
})
export class BookService extends BaseService{

    private bookUrl = "http://localhost:3001/book";
    private categoryUrl = "http://localhost:3001/category";
    private authorUrl = "http://localhost:3001/author";
    private async getBooksList(url: string): Promise<any> {
        return await firstValueFrom(this.httpClient.get<any>(this.bookUrl + url));
    }

    getBooks = (title: string, authorId: string, categoryId: string): Promise<{ [key: string]: Book }> =>
        this.getBooksList(`?title=${title}` + "&" + `author=${authorId}` + "&" + `category=${categoryId}`);


    getAuthors = async (): Promise<any> => await firstValueFrom(this.httpClient.get<any>(this.authorUrl));
    getCategories = async (): Promise<any> => await firstValueFrom(this.httpClient.get<any>(this.categoryUrl));


    // getCategories = (): Observable<{ [key: string]: Category }> => this.httpClient.get<any>(this.categoryUrl)
    //   .pipe(map(response  => response));
    //
    // getAuthors = (): Observable<{ [key: string]: Author }> => this.httpClient.get<any>(this.authorUrl)
    //     .pipe(map(response => response));


}


