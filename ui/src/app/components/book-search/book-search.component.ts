import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Category} from "../../common/category.component";
import {Author} from "../../common/author.component";

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css']
})
export class BookSearchComponent implements OnInit{
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    let title = this.activatedRoute.snapshot.queryParams['title'];
    let author = this.activatedRoute.snapshot.queryParams['author'];
    let category = this.activatedRoute.snapshot.queryParams['category'];
    sessionStorage.setItem('searchKeyword', title === "undefined" ? "" : title);
    sessionStorage.setItem('selectedAuthor', author === "undefined" ? "" : author);
    sessionStorage.setItem('selectedCategory', category === "undefined" ? "" : category);
  }

  @Input() bookAuthors!: { [key: string]: Author };
  @Input() bookCategories!: { [key: string]: Category };

  searchKeyword: string = sessionStorage.getItem('searchKeyword');
  selectedAuthor: string = sessionStorage.getItem('selectedAuthor');
  selectedCategory: string = sessionStorage.getItem('selectedCategory');

  changeFilterValue(e: any) {
    this[e.target.name] = e.target.value;
    sessionStorage.setItem(e.target.name, e.target.value);
  }

  searchBooks() {
    this.router.navigateByUrl(`books?title=${this.searchKeyword}&author=${this.selectedAuthor}&category=${this.selectedCategory}`);
  }

  protected readonly sessionStorage = sessionStorage;
}
