import {Component, Input} from '@angular/core';

import {Category} from "../../common/category.component";
import {Author} from "../../common/author.component";

@Component({
  selector: 'app-book-category',
  templateUrl: './book-category.component.html',
  styleUrls: ['./book-category.component.css']
})
export class BookCategoryComponent {
  constructor() {}
  @Input() bookAuthors!: { [key: string]: Author };
  @Input() bookCategories!: { [key: string]: Category };

}
