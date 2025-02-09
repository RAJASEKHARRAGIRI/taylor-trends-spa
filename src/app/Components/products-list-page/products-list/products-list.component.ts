import { Component, EventEmitter, Inject, inject, Input, OnInit, Output, PLATFORM_ID, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe, isPlatformBrowser, NgComponentOutlet } from '@angular/common';
import { ProductService } from '../../../Services/product.service';
import { LoaderComponent } from "../../common/Components/loader/loader.component";
import { ActivatedRoute, Router } from '@angular/router';
import { OffCanvasSideBarComponent } from '../../common/Components/off-canvas-side-bar/off-canvas-side-bar.component';
import { OffCanvasService } from '../../common/Services/off-canvas.service';
import { FiltersComponent } from '../filters/filters.component';

@Component({
  standalone: true,
  selector: 'products-list',
  imports: [AsyncPipe, LoaderComponent, OffCanvasSideBarComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent implements OnInit {
  public productsList$: Observable<any[]> = new Observable<any[]>;
  public count: number =0;
  public loading: boolean = false;
  public productId: number = 0;
  public currentComponent: any;
  @Input() public isFiltersApplicable: boolean = true;
  @Output() refreshPage: EventEmitter<number> = new EventEmitter();

  @ViewChild(OffCanvasSideBarComponent) offcanvas!: OffCanvasSideBarComponent;

  route = inject(ActivatedRoute);
  productService = inject(ProductService);  
  router = inject(Router);  
  canvasService = inject(OffCanvasService);  

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id'];
    this.GetProducts();
  }  

 

  public calculateAmount(item: any): number {
    return Math.ceil(item.price - ((item.discount / 100) * item.price));
  }

  public getRandomNumber(): number {
    return Math.floor(Math.random() * 9) + 1;
  }

  public viewProduct(product: any): void {
    this.router.navigate(['viewproduct', product.id]);
    this.refreshPage.emit(product.id);
  }

  ngAfterViewInit(): void {
    this.canvasService.setOffcanvasRef(this.offcanvas);
  }

  openOffcanvas(): void {
    if (isPlatformBrowser(this.platformId)) {
    this.canvasService.open(FiltersComponent, 'Filters', {
      message: '!',
    });
  }
  }

  private GetProducts(): void {
    this.loading = true;
    this.productsList$ = this.productService.getProducts();
    this.productsList$.subscribe(p => {
      this.count = p.length;
      this.loading = false;
    });
  }
}

