import { Component, OnInit } from '@angular/core';
import { ProductsListComponent } from "./products-list/products-list.component";
import { FiltersComponent } from "./filters/filters.component";

@Component({
  standalone: true,
  selector: 'products-list-page',
  imports: [ProductsListComponent, FiltersComponent],
  templateUrl: './products-list-page.component.html',
  styleUrl: './products-list-page.component.css'
})
export class ProductsListPageComponent implements OnInit {

  ngOnInit(): void {
   
  }

}
