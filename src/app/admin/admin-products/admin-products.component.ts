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

    constructor(private productService: ProductService) {
        this.productService.getAll().subscribe(p => {
            let obj = [];
            p.forEach(p => {
                let data = p['data'];
                data['key'] = p['key'];
                obj.push(data);
            });
            this.products = obj;
        });
    }

    ngOnInit() { }


}
