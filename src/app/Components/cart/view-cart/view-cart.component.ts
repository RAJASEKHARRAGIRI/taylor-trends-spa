import { Component, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../../Services/product.service';
import { ToastrService } from 'ngx-toastr';
import { CartDetails } from '../../../Models/CartDetails';
import { LoaderComponent } from "../../common/Components/loader/loader.component";
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {FormsModule} from '@angular/forms'
import { AddToCart } from '../../../Models/AddToCart';
import { PostApiResponse } from '../../../Models/ApiResponse';
import { OffCanvasSideBarComponent } from "../../common/Components/off-canvas-side-bar/off-canvas-side-bar.component";
import { OffCanvasService } from '../../common/Services/off-canvas.service';
import { WishListComponent } from '../../wishlist/wish-list/wish-list.component';
import { PaymentGateWayComponent } from '../payment-gate-way/payment-gate-way.component';
import { AddressListComponent } from '../../address/address-list/address-list.component';
import { ProceedToCheckoutComponent } from '../proceed-to-checkout/proceed-to-checkout.component';
import { CartService } from '../../../Services/cart.service';
import { CartProceedToPay } from '../../../Models/CartProceedToPay';


@Component({
  standalone: true,
  selector: 'app-view-cart',
  imports: [LoaderComponent, CommonModule, FormsModule, RouterLink, OffCanvasSideBarComponent],
  templateUrl: './view-cart.component.html',
  styleUrl: './view-cart.component.css'
})
export class ViewCartComponent implements OnInit{
  ngOnInit(): void {
    this.getCartDetails()
  }

   constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

   public totalCartPrice: number = 1;
   public totalCartPercent: number = 1;
   public totalFinalPrice: number = 1;
   public shippingprice: number = 50;
   public loading: boolean = false;
   public cartDetails: CartDetails[];
  

   route = inject(ActivatedRoute);
   cartService = inject(CartService);
   productService = inject(ProductService);
   toastr = inject(ToastrService);
   canvasService = inject(OffCanvasService);

  private getCartDetails(): void {
      this.loading = true; 
      this.cartDetails = [];
      this.productService.getCartDetails().subscribe((cart: CartDetails[]) => {
        this.cartDetails = cart;
        if(cart.length > 0)
          this.calTotalAmount()
        this.loading = false;
      },
      error =>{
        this.loading = false;
      });
    }

    private calTotalAmount(): void {
      this.totalCartPrice =0;
      this.totalCartPercent =0;
      this.totalFinalPrice =0;
       this.totalCartPrice = this.cartDetails.map(o => this.calculateAmount(o.price, o.discount, o.quantity)).reduce((a, c) => { return a + c });
       this.totalCartPercent = Math.ceil(((10 / 100) * this.totalCartPrice));
       this.totalFinalPrice = this.totalCartPrice + this.totalCartPercent ;
       if(this.totalFinalPrice > 500){
        this.shippingprice =0;
       } else {
        this.totalFinalPrice = this.shippingprice + this.totalFinalPrice
       }
    }

    public calculateAmount(price: number, discount: number, quantity: number): number {
      return Math.ceil((price - ((discount / 100) * price))* quantity);
    }

    public DecreaseQuantity(item: any): void {
      if(item.quantity <= 0){
        item.quantity = 1;
        return;
      }
      item.quantity--;
      this.calTotalAmount()
      this.UpdateCart(item)
    }
    public IncreaseQuantity(item: any ): void {
      item.quantity++;
      this.calTotalAmount()
      this.UpdateCart(item);
    }

    private UpdateCart(item: any): void {
      let payload: AddToCart = {
            id: item.cartId ?? 0,
            productId: item.productId,
            userid: 1,
            quantity: item.quantity  
          };
          this.productService.updateCart(payload).subscribe( 
            (response: PostApiResponse) => {
              this.toastr.success(response.message)
            },
            error => {
              this.toastr.error("Error occured, please try after sometime.")
            }
        );
    }
  
    public removeItem(cartId: number ): void {
      this.productService.deleteCartItem(cartId).subscribe(p=> {
        this.getCartDetails()
        this.toastr.success(p.message)
      })
    }

    public checkOut(): void {
      // this.toastr.info("Order placed")
      this.openOffcanvas()
    }

    openOffcanvas(): void {
      if (isPlatformBrowser(this.platformId)) {
        let data = <CartProceedToPay>{address: null, 
          currentState:"address", 
          paymentDetails: null, 
          totalPrice: this.totalFinalPrice,
          totalCartPrice: this.totalCartPrice,
          totalCartPercent: this.totalCartPercent,
          totalItems: this.cartDetails.length,
        };
        this.cartService.isOpenedFromCart(data);
        this.canvasService.open(ProceedToCheckoutComponent, 'Proceed to Pay: Rs. '+ this.totalFinalPrice+"/-", {
          message: 'step1',
          totalCartPrice: this.totalCartPrice
        });
      }
    }

    // openOffcanvas1(): void {
    //   if (isPlatformBrowser(this.platformId)) {
    //     this.canvasService.open(PaymentGateWayComponent, 'Payment Gateway', {
    //       message: 'data',
    //       price: this.totalFinalPrice
    //     });
    //   }
    // }
  
}
