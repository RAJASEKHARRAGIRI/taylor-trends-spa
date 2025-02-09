import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { ProductService } from '../../../Services/product.service';

@Component({
  standalone: true,
  selector: 'categories',
  imports: [AsyncPipe],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {

  public categoriesList$: Observable<any[]> = new Observable<any[]>;
  ngOnInit(): void {
    this.GetCategories();
  }

  productService = inject(ProductService);

  public AddToCart(): void {
    alert("Product added to cart 1");
  }

  private GetCategories(): void {
   this.categoriesList$ = this.productService.getCategories();
  }

}
