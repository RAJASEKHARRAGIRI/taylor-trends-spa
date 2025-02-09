import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PostApiResponse } from '../../../Models/ApiResponse';
import { LoginFormComponent } from '../Components/login-form/login-form.component';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

    private baseUrl: string = "http://localhost:5124/api/User";

    private isAuthenticated = new BehaviorSubject<boolean>(false);
    castUserAuthentication = this.isAuthenticated.asObservable();
 
   constructor(private httpClient: HttpClient) { }

   login(payload: any): Observable<any> {
     return this.httpClient.post<any>(this.baseUrl + '/login/', payload );
   }

  isUserAuthenticated(flag: boolean) {
    this.isAuthenticated.next(flag);
  }

}
