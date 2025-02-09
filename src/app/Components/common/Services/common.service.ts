import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private isUserLogin = new BehaviorSubject<boolean>(false);
  castUserLogin = this.isUserLogin.asObservable();



  constructor() { }

  isUserLoggedIn(userLogin: boolean) {
    this.isUserLogin.next(userLogin);
  }

  checkUserLogin() {
    let data = localStorage.getItem("bearerToken")
    let name = localStorage.getItem("fullName")
    if(data === null || data === undefined){
      return {userLogin: false, fullName: ""};
    }
    return {userLogin: true, fullName: name};
  }
}
