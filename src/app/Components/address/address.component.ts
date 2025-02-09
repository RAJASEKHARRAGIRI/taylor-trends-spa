import { Component } from '@angular/core';
import { AddAddressComponent } from "./add-address/add-address.component";
import { AddressListComponent } from "./address-list/address-list.component";

@Component({
  standalone: true,
  selector: 'app-address',
  imports: [AddAddressComponent, AddressListComponent],
  templateUrl: './address.component.html',
  styleUrl: './address.component.css'
})
export class AddressComponent {

}
