import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CartProceedToPay } from '../../../Models/CartProceedToPay';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'order-summary',
  imports: [CommonModule, FormsModule],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css'
})
export class OrderSummaryComponent implements OnInit{

  @Input() public addressDetails: any = {};
  @Input() public paymentDetails: any = {};
  @Input() public cartAmountDetails: CartProceedToPay;

  ngOnInit(): void {
    console.log(this.paymentDetails)
    console.log(this.addressDetails)
    console.log(this.cartAmountDetails)
  }
}
