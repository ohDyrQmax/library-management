import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-ticket-search',
  templateUrl: './ticket-search.component.html',
  styleUrls: ['./ticket-search.component.css']
})
export class TicketSearchComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    let borrower = this.activatedRoute.snapshot.queryParams['borrower'];
    let title = this.activatedRoute.snapshot.queryParams['title'];
    sessionStorage.setItem('searchTicketBorrower', borrower === undefined ? "" : borrower);
    sessionStorage.setItem('searchTicketBook', title === undefined ? "" : title);
  }

  changeFilterValue(e: any) {
    this[e.target.name] = e.target.value;
    sessionStorage.setItem(e.target.name, e.target.value);
  }

  searchTicket() {
    let searchName = sessionStorage.getItem("searchTicketBorrower");
    let searchTitle = sessionStorage.getItem("searchTicketBook");
    this.router.navigateByUrl(`tickets?borrower=${searchName}&title=${searchTitle}`);
  }


}
