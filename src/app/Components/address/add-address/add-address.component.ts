import { AfterViewInit, Component, ElementRef, Inject, inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { AddressService } from '../../../Services/address.service';
import { Address } from '../../../Models/Address';
import { ToastrService } from 'ngx-toastr';
import { PostApiResponse } from '../../../Models/ApiResponse';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Modal } from 'bootstrap';
import { isPlatformBrowser } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-add-address',
  imports: [ReactiveFormsModule ],
  templateUrl: './add-address.component.html',
  styleUrl: './add-address.component.css'
})
export class AddAddressComponent  implements OnInit {

  @ViewChild('addressModalCloseButton') addressModalCloseButton!: ElementRef;
  @ViewChild('addAdressModalButton') addAdressModalButton!: ElementRef;
  
  addressForm!: FormGroup;
  public loading: boolean = false;
  addressService = inject(AddressService);
  toastr = inject(ToastrService);
  formBuilder = inject(FormBuilder);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  
  ngOnInit(): void {
    this.initializeForm();
    this.addressService.castEditButtonClick.subscribe( address => {
      if(address.id > 0) {
        console.log(address)
        this.addAdressModalButton?.nativeElement?.click();
        this.addressForm.setValue(address);
      }
    });
  }

  initializeForm() {
    this.addressForm = this.formBuilder.group({
      id: [0], // Default value, might come from the backend
      pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]], // Indian pincode validation
      fullName: ['', Validators.required],
      address1: ['', Validators.required],
      address2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      landMark: [''],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // Phone number validation
      isBilling: [false],
      isDefault: [false],
      selected: [false],
      createdAt: [new Date().toISOString()] // Default to current date
    });
  }

  onSubmit() {
    this.addressForm.markAllAsTouched();
    if (this.addressForm.valid) {
      if(this.addressForm.get('id')?.value > 0) {
        this.UpdateAddress();
      } else {
        this.AddAddress();
      }
    } else {
      console.log('Form is invalid!');
    }
  }

  public UpdateAddress(): void {
    this.addressService.updateAddress(this.addressForm.value).subscribe(
      (response: PostApiResponse) => {
        this.addressService.isNewAddressFormSubmitted(true);
        this.toastr.success(response.message)
        this.addressModalCloseButton?.nativeElement?.click();
      },
      error => {
        this.toastr.error("Error occured, please try after sometime.")
      }
    );
  }

  public AddAddress(): void {
    this.addressService.addAddress(this.addressForm.value).subscribe(
      (response: PostApiResponse) => {
        this.addressService.isNewAddressFormSubmitted(true);
        this.toastr.success(response.message)
        this.addressModalCloseButton?.nativeElement?.click();
      },
      error => {
        this.toastr.error("Error occured, please try after sometime.")
      }
    );
  }

  openAddModal(){
    this.initializeForm();
  }
}


