import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {BaseService} from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class TicketService extends BaseService {

  private ticketUrl = "http://localhost:3001/ticket";
  listTicket = (url: string): Observable<any> => {
    return this.httpClient.get(this.ticketUrl + url, {'headers': this.createAuthorizationHeader()}).pipe(map(response => response));
  }

  getTickets = (borrower: string, title: string) => {
    return this.listTicket(`?borrower=${borrower}&title=${title}`);
  }

  listTicketById = (): Observable<any> => {
    return this.httpClient.get(this.ticketUrl + `/id`, {'headers': this.createAuthorizationHeader()}).pipe(map(response => response));
  }

  borrowBook(data: any): Observable<any> {
    return this.httpClient.post(this.ticketUrl, data, {'headers': this.createAuthorizationHeader()})
      .pipe(map(response => response));
  }

  returnBook(id: string): Observable<any> {
    return this.httpClient.patch(this.ticketUrl + `/${id}`, {}, {'headers': this.createAuthorizationHeader()});
  }
}

