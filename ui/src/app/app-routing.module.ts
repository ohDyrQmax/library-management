import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BookListComponent} from "./components/book-list/book-list.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {UserListComponent} from "./components/user-list/user-list.component";
import {TicketListComponent} from "./components/ticket-list/ticket-list.component";

const routes: Routes = [

  {path: 'books', component: BookListComponent},
  {path: 'books?', component: BookListComponent},
  {path: 'users', component: UserListComponent},
  {path: 'tickets', component: TicketListComponent},
  {path: '', redirectTo: '/books', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
