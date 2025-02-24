import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { ProductService } from '../../../Services/product.service';
import { Router, RouterLink } from '@angular/router';
import { ProductFilterRequest } from '../../../Models/ProductFilterRequest';

@Component({
  standalone: true,
  selector: 'trending',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './trending.component.html',
  styleUrl: './trending.component.css'
})
export class TrendingComponent  implements OnInit {
  public productsList$: Observable<any[]> = new Observable<any[]>;
  ngOnInit(): void {
    this.GetProducts();
  }

  productService = inject(ProductService);
    router = inject(Router);  

  public AddToCart(): void {
    alert("Product added to cart 1");
  }

  public viewProduct(product: any): void {
    this.router.navigate(['viewproduct', product.id]);
  }

  public calculateAmount(item: any): number {
    return Math.ceil(item.price - ((item.discount / 100) * item.price));
  }
  private GetProducts(): void {
    let payload: ProductFilterRequest = {
          price: 0,
          discount: 0,
          category: ''
        };
   this.productsList$ = this.productService.getProducts(payload);
  }
}
