import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { ProductService } from '../../../Services/product.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'categories',
  imports: [AsyncPipe],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {

  public categoriesList$: Observable<any[]> = new Observable<any[]>;
   router = inject(Router);  
   
  ngOnInit(): void {
    this.GetCategories();
  }

  productService = inject(ProductService);

  public AddToCart(): void {
    alert("Product added to cart 1");
  }

  public viewProduct(product: any): void {
    this.router.navigate(['viewproducts']);
  }

  private GetCategories(): void {
   this.categoriesList$ = this.productService.getCategories();
  }

}
