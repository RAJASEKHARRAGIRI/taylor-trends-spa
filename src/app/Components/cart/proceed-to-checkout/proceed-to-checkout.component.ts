import { Component, inject, OnInit } from '@angular/core';
import { AddressListComponent } from "../../address/address-list/address-list.component";
import { PaymentGateWayComponent } from "../payment-gate-way/payment-gate-way.component";
import { CommonService } from '../../common/Services/common.service';
import { CartProceedToPay } from '../../../Models/CartProceedToPay';
import { CartService } from '../../../Services/cart.service';
import { OrderSummaryComponent } from "../order-summary/order-summary.component";
import { ToastrService } from 'ngx-toastr';

@Component({
  standalone: true,
  selector: 'app-proceed-to-checkout',
  imports: [AddressListComponent, PaymentGateWayComponent, OrderSummaryComponent],
  templateUrl: './proceed-to-checkout.component.html',
  styleUrl: './proceed-to-checkout.component.css'
})
export class ProceedToCheckoutComponent implements OnInit {
  statesList: any [] = [{"id": 1, "isActive": true, "name":"address"}, {"id": 2, "isActive": false, "name":"payment"},  {"id": 3, "isActive": false, "name":"summary"}];
  currentState: string = "summary";
  proceedAddress: any = {};
  proceedPayment: any = {};
  cartAmountDetails: CartProceedToPay;

  cartService = inject(CartService);
  toastr = inject(ToastrService);
  
  ngOnInit(): void {
    this.cartService.castOpenFromCart.subscribe( (response: CartProceedToPay) => {
      this.currentState = response.currentState;
      this.cartAmountDetails = response;
    })
  }

  selectedAddress(address: any): void {
    this.proceedAddress = address;
  }

  selectedPayment(paymentDetails: any): void {
    this.proceedPayment = paymentDetails;
  }

  proceedToNext(): void {
    if(this.currentState == "address" && this.proceedAddress != null) {
      this.currentState = "payment";
    } else if(this.currentState == "payment" && this.proceedPayment != null) {
      this.currentState = "summary";
    } else if(this.currentState == "summary") {
      this.currentState = "summary";
      this.toastr.success("Successfully your order placed!")
    }
  }

}
