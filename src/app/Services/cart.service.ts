import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartProceedToPay } from '../Models/CartProceedToPay';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private isOpenFromCart = new BehaviorSubject<CartProceedToPay>(<CartProceedToPay>{});
  castOpenFromCart = this.isOpenFromCart.asObservable();
  
  constructor() { }

  isOpenedFromCart(cartStatus: CartProceedToPay) {
    this.isOpenFromCart.next(cartStatus);
  }
}
