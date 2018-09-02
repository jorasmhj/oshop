import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from '../../category.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  categories$: any;
  @Input('category') category;

  constructor(categoryService: CategoryService) {
    categoryService.getAll().subscribe(c => this.categories$ = c);
  }

  ngOnInit() {
  }

}
