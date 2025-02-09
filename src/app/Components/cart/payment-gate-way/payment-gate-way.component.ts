import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  standalone: true,
  selector: 'payment-gate-way',
  imports: [CommonModule],
  templateUrl: './payment-gate-way.component.html',
  styleUrl: './payment-gate-way.component.css'
})
export class PaymentGateWayComponent implements OnInit{


  @Output() selectedPayment: EventEmitter<any> = new EventEmitter();
  @Input() data: any;
 
  toastr = inject(ToastrService);
     
  public paymentGatewayList = [
    {id:1, name: "Show QR Code", description: "Scan with any UPI app", icon: "fa-solid fa-qrcode", isActive: true},
    {id:2, name: "UPI", description: "PhonePe, Gpay, Paytm, BHIM & more", icon: "fa-solid fa-at",isActive: false},
    {id:3, name: "Card", description: "Visa, MasterCard, Rupay & more", icon: "fa-regular fa-credit-card",isActive: false},
    {id:4, name: "Net Banking", description: "HDFC, ICICI, Axis, Sbi & more", icon: "fa-solid fa-building-columns",isActive: false},
    {id:5, name: "Cash on Delivery", description: "An additional charge of ₹7 will apply", icon: "fa-solid fa-indian-rupee-sign",isActive: false}
  ];

  paymentType: any = this.paymentGatewayList[0];

  ngOnInit(): void {
    this.selectedPayment.emit(this.paymentGatewayList[0])
  }

  public selectPayamentMethod(paymentType: any): void {
    this.paymentGatewayList.forEach((element, index) => {
      if(element.id === paymentType.id) {
        this.paymentGatewayList[index].isActive = true;
        this.paymentType = paymentType;
        this.selectedPayment.emit(paymentType)
      } else {
        this.paymentGatewayList[index].isActive = false;
      }
  });
  }

  public proceedToPay():void {
    this.toastr.success("Ready to pay via "+ this.paymentType.name)
  }
}
