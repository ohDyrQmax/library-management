import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BookListComponent} from './components/book-list/book-list.component';
import {HttpClientModule} from "@angular/common/http";
import {BookService} from "./services/book.service";
import {AuthService} from "./services/auth.service";
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {NgOptimizedImage} from "@angular/common";
import {BookSearchComponent} from './components/book-search/book-search.component';
import {ReactiveFormsModule} from "@angular/forms";
import {UserListComponent} from './components/user-list/user-list.component';
import { TicketListComponent } from './components/ticket-list/ticket-list.component';


@NgModule({
    declarations: [
        AppComponent,
        BookListComponent,
        PageNotFoundComponent,
        BookSearchComponent,
        UserListComponent,
        TicketListComponent,
    ],
  imports: [
    BrowserModule,
    HttpClientModule,

    NgOptimizedImage,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
    providers: [
        BookService,
        AuthService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
