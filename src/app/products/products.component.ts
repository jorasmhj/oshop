import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../shoppiing-cart.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart: any;
  subscription;

  constructor(
    productService: ProductService,
    route: ActivatedRoute,
    private cartService: ShoppingCartService
  ) {
    productService
      .getAll()
      .pipe(
        switchMap(p => {
          this.products = p;
          return route.queryParamMap;
        })
      )
      .subscribe(p => {
        route.queryParamMap.subscribe(params => {
          this.category = params.get('category');
          this.filteredProducts = this.category
            ? this.products.filter(
                product => product.category === this.category
              )
            : this.products;
        });
      });
  }

  async ngOnInit() {
    this.subscription = (await this.cartService.getCart()).subscribe(
      cart => (this.cart = cart)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
