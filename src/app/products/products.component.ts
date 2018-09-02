import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../shoppiing-cart.service';
import * as moment from 'moment';

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
  now = moment().format('LLLL');

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
    let startdate = '20.03.2014';
    let repeteDays = 5;
    let dates = [];
    for (let i = 1; i <= repeteDays; i++) {
      let new_date = moment(startdate, 'DD-MM-YYYY').add('days', 1);
      startdate = new_date.format('DD.MM.YYYY');
      dates.push(new_date);
      console.log(startdate);
    }

    // console.log(dates);
    this.subscription = (await this.cartService.getCart()).subscribe(
      cart => (this.cart = cart)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
