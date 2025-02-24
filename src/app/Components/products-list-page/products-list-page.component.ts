import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductsListComponent } from "./products-list/products-list.component";
import { FiltersComponent } from "./filters/filters.component";
import { ProductFilterRequest } from '../../Models/ProductFilterRequest';
import { subscribe } from 'diagnostics_channel';
import { ProductService } from '../../Services/product.service';

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
  constructor( private service: ProductService) {}

  public receiveFilters(filters: ProductFilterRequest): void {
    this.service.isFiltersChanged(filters);
  }

}
