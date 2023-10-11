import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {Book} from './common/book.component';
import {BookListComponent} from './components/book-list/book-list.component';
import {HttpClientModule} from "@angular/common/http";
import {BookService} from "./services/book.service";
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {NgOptimizedImage} from "@angular/common";
import {BookSearchComponent} from './components/book-search/book-search.component';

@NgModule({
    declarations: [
        AppComponent,
        BookListComponent,
        PageNotFoundComponent,
        BookSearchComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,

        NgOptimizedImage,
        AppRoutingModule,
    ],
    providers: [
        BookService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
