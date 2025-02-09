import { Component, Inject, inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { LoginFormComponent } from '../../common/Components/login-form/login-form.component';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../Services/product.service';
import { CartDetails } from '../../../Models/CartDetails';
import { OffCanvasSideBarComponent } from "../../common/Components/off-canvas-side-bar/off-canvas-side-bar.component";
import { OffCanvasService } from '../../common/Services/off-canvas.service';
import { isPlatformBrowser } from '@angular/common';
import { WishListComponent } from '../../wishlist/wish-list/wish-list.component';
import { CommonService } from '../../common/Services/common.service';

@Component({
  selector: 'menu-bar',
  standalone: true,
  imports: [LoginFormComponent, RouterLink, OffCanvasSideBarComponent],
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.css'
})
export class MenuBarComponent implements OnInit {
  loginDetails: any;
  isUserLogin: boolean = false;
  ngOnInit(): void {
    this.getCartDetails();
    this.commonService.castUserLogin.subscribe(res => {
      this.isUserLogin = res;
    });
    if(!this.isUserLogin) {
      let details = this.commonService.checkUserLogin();
      this.isUserLogin = details.userLogin;
      this.loginDetails = details;
    }
  }
  @ViewChild(OffCanvasSideBarComponent) offcanvas!: OffCanvasSideBarComponent;


  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  cartCount: number = 0;
  @ViewChild('loginForm', { static: false }) loginForm?: LoginFormComponent;

  productService = inject(ProductService);
  canvasService = inject(OffCanvasService);
  commonService = inject(CommonService);

  ngAfterViewInit(): void {
    this.canvasService.setOffcanvasRef(this.offcanvas);
  }

  openOffcanvas(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.canvasService.open(WishListComponent, 'Wishlist', {
        message: 'data',
      });
    }
  }

  public openModal(): void {
    this.loginForm?.openModal("Raavan");
  }

  private getCartDetails(): void {
    this.productService.getCartDetails().subscribe((cart: CartDetails[]) => {
      this.cartCount = cart.length;
    })
  }

  public logOut(){
   localStorage.removeItem("bearerToken");
   this.isUserLogin = false;
   this.commonService.isUserLoggedIn(false);
  }
}
