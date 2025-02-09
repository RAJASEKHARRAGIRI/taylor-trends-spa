
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PostApiResponse } from '../Models/ApiResponse';
import { Address } from '../Models/Address';


@Injectable({
  providedIn: 'root'
})

export class AddressService {

  private baseUrl: string = "http://localhost:5124/api/Address";
  private isAddressFormSubmitted = new BehaviorSubject<boolean>(false);
  castNewAddressAdded = this.isAddressFormSubmitted.asObservable();

  private isAddressEditClicked = new BehaviorSubject<Address>(<Address>{});
  castEditButtonClick = this.isAddressEditClicked.asObservable();

  constructor(private httpClient: HttpClient) { }

  isNewAddressFormSubmitted(flag: boolean) {
    this.isAddressFormSubmitted.next(flag);
  }
  isEditButtonClicked(address: Address) {
    this.isAddressEditClicked.next(address);
  }

  addAddress(address: Address): Observable<PostApiResponse> {
    return this.httpClient.post<PostApiResponse>(this.baseUrl + '/AddAddress/', address );
  }

  updateAddress(address: Address): Observable<PostApiResponse> {
    return this.httpClient.put<PostApiResponse>(this.baseUrl + '/UpdateAddress/', address );
  }

  getAddresses(): Observable<Address[]> {
    return this.httpClient.get<Address[]>(this.baseUrl);
  }

  deleteAddress(addressId: number): Observable<any> {
    return this.httpClient.delete<any>(this.baseUrl + '/'+ addressId);
  }

}
