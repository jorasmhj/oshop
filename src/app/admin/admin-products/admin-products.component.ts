import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';
import { Product } from '../../models/product';


@Component({
    selector: 'app-admin-products',
    templateUrl: './admin-products.component.html',
    styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
    products: Product[];

    items: Product[] = [];
    count: number;

    constructor(private productService: ProductService) {
        productService.getAll().subscribe(p => this.products = p);
    }


    ngOnInit() { }


}
