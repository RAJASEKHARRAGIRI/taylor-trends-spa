import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../Services/product.service';
import { LoaderComponent } from "../common/Components/loader/loader.component";
import { error } from 'console';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from "../products-list-page/products-list/products-list.component";
import {FormsModule} from '@angular/forms'
import { AddToCart } from '../../Models/AddToCart';
import { PostApiResponse } from '../../Models/ApiResponse';
import { ToastrService } from 'ngx-toastr';
import { CartDetails } from '../../Models/CartDetails';

@Component({
  standalone: true,
  selector: 'view-product-page',
  imports: [LoaderComponent, CommonModule, ProductsListComponent, FormsModule],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent implements OnInit {
  public productDetails: any;
  public loading: boolean = false;
  public selectedImage: string = "";
  public showAlert: boolean = false;
  public quantity: number = 1;
  public productId: number = 0;
  public checkedIndex: any ="S";
  public isProductInCart: boolean = false;
  private cartDetails: any;
  

  route = inject(ActivatedRoute);
  productService = inject(ProductService);
  toastr = inject(ToastrService);

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id'];
    this.getProductDetailsId(this.productId);
    this.getCartDetails();
  }

  public RefreshPage(pId: any): void {
    this.productId = pId;
    this.quantity = 1;
    this.getProductDetailsId(pId);
    this.getCartDetails();
  }

  public displayImage(image: any): void {
    this.productDetails.images.forEach((img: any) => {
      img.active = false;
    });
    image.active = true;
    this.selectedImage = image.url;
  }

  private getProductDetailsId(productId: number): void {
    this.loading = true;
    this.productService.getProductDetailsById(productId).subscribe(p => {
      this.productDetails = p;
      
      this.productDetails.images[0].active = true;
      this.selectedImage = this.productDetails?.images[0]?.url;
      this.loading = false;
    },
    error =>{
      this.loading = false;
    });
  }

  private getCartDetails(): void {
    this.loading = true; 
    this.isProductInCart = false;
    this.cartDetails = null;
    this.productService.getCartDetails().subscribe((cart: CartDetails[]) => {
      this.cartDetails = cart.filter(c => c.productId == this.productId)[0];
      this.isProductInCart = this.cartDetails?.cartId > 0;
      this.loading = false;
    },
    error =>{
      this.loading = false;
    });
  }

  public calculateAmount(price: number, discount: number): number {
    return Math.ceil(price - ((discount / 100) * price));
  }

  public convertTags(tags: any): string {
    return tags.toString();
  }

  public AddToCart(): void {
    let payload: AddToCart = {
      id: this.cartDetails?.cartId ?? 0,
      productId: this.productId,
      userid: 1,
      quantity: this.quantity 
    };
    this.productService.addToCart(payload).subscribe( 
      (response: PostApiResponse) => {
        this.toastr.success(response.message)
      },
      error => {
        this.toastr.error("Error occured, please try after sometime.")
      }
  );
  }

  public DecreaseQuantity(): void {
    if(this.quantity <= 0){
      this.quantity = 0;
      return;
    }
    this.quantity--;
  }
  public IncreaseQuantity(): void {
    this.quantity++;
  }

  public onCheckboxChange(index: any): void {
    this.checkedIndex = this.checkedIndex === index ? null : index;
  }

  
}
