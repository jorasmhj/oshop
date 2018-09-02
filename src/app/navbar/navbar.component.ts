import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ShoppingCartService } from '../shoppiing-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  shoppingCartItemCount: number;
  cart$: Observable<ShoppingCart>;

  constructor(
    private auth: AuthService,
    private router: Router,
    private cartService: ShoppingCartService
  ) {}

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
