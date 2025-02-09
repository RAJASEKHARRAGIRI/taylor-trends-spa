import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { AddressService } from '../../../Services/address.service';
import { LoaderComponent } from "../../common/Components/loader/loader.component";
import { Address } from '../../../Models/Address';
import { CommonModule, DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../common/Services/common.service';
import { response } from 'express';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'address-list',
  imports: [LoaderComponent, DatePipe,CommonModule, FormsModule],
  templateUrl: './address-list.component.html',
  styleUrl: './address-list.component.css'
})
export class AddressListComponent  implements OnInit  {
    @Input() public isViewCart: boolean = false;
    @Output() selectedAddress: EventEmitter<Address> = new EventEmitter();

    public loading: boolean = false;
    public addressesList: Address[];
    addressService = inject(AddressService);
    toastr = inject(ToastrService);  
    commonService = inject(CommonService);  


    ngOnInit(): void {
      this.GetAddresses();
      this.addressService.castNewAddressAdded.subscribe( addressAdded => {
        if(addressAdded)
        {
          this.GetAddresses();
        }
      });
    } 

    editAddress(address: Address): void {
      this.addressService.isEditButtonClicked(address);
    }

    deleteAddress(address: Address): void {
      if(confirm("Are you sure you want delete this Address?") == false){
        return;
      }
      this.addressService.deleteAddress(address.id).subscribe( response => {
        this.toastr.success(response.message);
        this.GetAddresses();
      });
    }

    selectAddress(address: Address): void {
      for (let item of this.addressesList) {
        if(item.id != address.id){
          item.selected = false;
        } else {
          item.selected = true;
          this.selectedAddress.emit(address);
        }
      }
    }

    private GetAddresses(): void {
      this.loading = true;

      this.addressService.getAddresses().subscribe( response => {
        this.addressesList = response;
        this.selectedAddress.emit(this.addressesList[0]);
        this.loading = false;
      });
    }
}
