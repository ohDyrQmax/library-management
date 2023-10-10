import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent{

  constructor(
    private router: Router
  ) {}
  searchBooks(keyword: string) {
    this.router.navigateByUrl(`book/search/${keyword}`);
  }
}
