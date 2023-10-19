import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Ticket} from "../../../common/common.component";
import {TicketService} from "../../../services/ticket.service";

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit{
  Tickets: { [key:string]: Ticket }

  constructor(
      private authService: AuthService,
      private ticketService: TicketService,
      private router: Router,
      private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.activatedRoute.queryParams.subscribe(() => {
        this.listTicket();
      });
    }
    else {
      this.router.navigateByUrl("/");
    }
  }

  isStaff() {
    return this.authService.isStaff();
  }

  listTicket() {
    if(this.authService.isStaff()) {
      let borrower: string = this.activatedRoute.snapshot.queryParams['borrower'] || "";
      let title: string = this.activatedRoute.snapshot.queryParams['title'] || "";
      this.ticketService.getTickets(borrower, title).subscribe({
        next: data => {
          this.Tickets = data;
        },
        error: err => {
          console.log(JSON.stringify(err.error));
        }
      })
    } else {
      this.ticketService.listTicketById().subscribe({
        next: data => {
          this.Tickets = data;
        },
        error: err => {
          console.log(err.error.message || err.error.error);
        }
      })
    }
  }

  returnBook(id: string) {
    this.ticketService.returnBook(id).subscribe({
      next:value => {
        alert("Return book successfully");
        window.location.reload();
        },
      error:err => {console.log(err.error.message || err.error)}
    })
  }
}
