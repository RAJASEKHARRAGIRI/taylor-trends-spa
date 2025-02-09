import { CommonModule } from '@angular/common';
import { AfterViewChecked, Component, ElementRef, inject, OnInit, ViewChild, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../Services/login.service';
import { CommonService } from '../../Services/common.service';


@Component({
  standalone: true,
  selector: 'login-form',
  imports: [CommonModule,FormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent implements OnInit{
  @ViewChild("exampleModal") modalRef: ElementRef | undefined;
  isNotified: boolean = false;


  ngOnInit(): void {
   
  }
 

  title:string ="";
  mobileNumber: string ="";
  password: string ="";
  toastr = inject(ToastrService);
  loginService = inject(LoginService);
  commonService = inject(CommonService);


  openModal(title: string): void {
    this.title = title;
    if(this.modalRef && this.modalRef.nativeElement.style.display !== "block"){
      this.modalRef.nativeElement.style.display = "block";
    } 
  }

  closeModal(): void {
    if(this.modalRef){
      this.modalRef.nativeElement.style.display = "none";
    }
  }

  login(): void {
    if(this.password && this.mobileNumber){
      let payload: any = {
            mobileNumber: this.mobileNumber,
            password: this.password
          };
          this.loginService.login(payload).subscribe( 
            (response: any) => {
              this.toastr.success(response.message);
              localStorage.setItem("bearerToken", response.token)
              localStorage.setItem("fullName", response?.user?.name)
              this.closeModal();
              this.commonService.isUserLoggedIn(true);
            },
            (error: any) => {
              this.toastr.error("Login Failed, Please enter vaild credentials.")
            }
        );
    }
  }

  onKeyUpEvent(): void {
    // if(this.mobileNumber == "1234567890"){
    //   this.closeModal()
    //   this.toastr.success("Welcome back! Happy shopping..");
    // }
  }
}
