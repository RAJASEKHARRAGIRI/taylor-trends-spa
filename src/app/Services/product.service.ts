import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PostApiResponse } from '../Models/ApiResponse';
import { AddToCart } from '../Models/AddToCart';
import { CartDetails } from '../Models/CartDetails';
import { ProductFilterRequest } from '../Models/ProductFilterRequest';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  private baseUrl: string = "http://localhost:5124/api/products";

  constructor(private httpClient: HttpClient) { }

  private filtersChanged = new BehaviorSubject<ProductFilterRequest>({} as ProductFilterRequest);
  castChangedFilter = this.filtersChanged.asObservable();

  isFiltersChanged(filters: ProductFilterRequest) {
    this.filtersChanged.next(filters);
  }

  getProducts(payload: ProductFilterRequest): Observable<any[]> {
    return this.httpClient.post<any[]>(this.baseUrl, payload);
  }

  getCategories(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.baseUrl + '/categories');
  }

  getProductDetailsById(id: number): Observable<any[]> {
    return this.httpClient.get<any[]>(this.baseUrl + '/productDetails/' + id);
  }

  addToCart(cart: AddToCart): Observable<PostApiResponse> {
    return this.httpClient.post<PostApiResponse>(this.baseUrl + '/AddCart/', cart );
  }

  updateCart(cart: AddToCart): Observable<PostApiResponse> {
    return this.httpClient.put<PostApiResponse>(this.baseUrl + '/UpdateCart/', cart );
  }

  getCartDetails(): Observable<CartDetails[]> {
    return this.httpClient.get<CartDetails[]>(this.baseUrl + '/cartDetails');
  }

  deleteCartItem(cardId: number): Observable<any> {
    return this.httpClient.delete<any>(this.baseUrl + '/DeleteProductFromCart/'+ cardId);
  }

}
