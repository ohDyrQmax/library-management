import {Injectable} from '@angular/core';
import {firstValueFrom, map, Observable} from "rxjs";
import {BaseService} from "./base.service";

@Injectable({
    providedIn: 'root'
})
export class TicketService extends BaseService  {

    private ticketUrl = "http://localhost:3001/ticket";
    listTicket = (): Observable<any> => {
        return this.httpClient.get(this.ticketUrl, { 'headers': this.createAuthorizationHeader() }).pipe(map(response => response));
    }

    listTicketById = (id: string): Observable<any> => {
        return this.httpClient.get(this.ticketUrl + `/${id}`, { 'headers': this.createAuthorizationHeader() }).pipe(map(response => response));
    }

}

