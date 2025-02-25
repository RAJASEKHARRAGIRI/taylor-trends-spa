import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'order-tracking',
  imports: [DatePipe],
  templateUrl: './order-tracking.component.html',
  styleUrl: './order-tracking.component.css'
})
export class OrderTrackingComponent {
  futureDate: Date = new Date();
  public estimatedDeliveryDate: Date = new Date(this.futureDate.setDate(new Date().getDate() + 5));
}
