import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BookListComponent} from './components/book/book-list/book-list.component';
import {HttpClientModule} from "@angular/common/http";
import {BookService} from "./services/book.service";
import {AuthService} from "./services/auth.service";
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {NgOptimizedImage} from "@angular/common";
import {BookSearchComponent} from './components/book/book-search/book-search.component';
import {ReactiveFormsModule} from "@angular/forms";
import {UserListComponent} from './components/user-list/user-list.component';
import { TicketListComponent } from './components/ticket/ticket-list/ticket-list.component';
import { TicketSearchComponent } from './components/ticket/ticket-search/ticket-search.component';


@NgModule({
    declarations: [
        AppComponent,
        BookListComponent,
        BookSearchComponent,
        UserListComponent,
        TicketListComponent,
        TicketSearchComponent,
        PageNotFoundComponent,
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
