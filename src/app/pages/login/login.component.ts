import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { login } from 'src/app/model/login.model';
import { AuthService } from 'src/app/service/Auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  login : login;
  constructor(private formBuilder: FormBuilder,
    private authservice : AuthService,
    private Router : Router,
    private toastr : ToastrService,
    ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.email, Validators.minLength(5)])],
      password :['',Validators.compose([Validators.required, Validators.minLength(9)])],
  }, );
  }
  get f(){
    return this.registerForm.controls;
  }

  LoginAuth(){
    if (this.registerForm.invalid) {
      return;
    }
    
    console.log(this.registerForm.value);
   this.authservice.authLogin(this.registerForm.value).subscribe((result: any)=>{
     if(result.result == true){
       console.log(result);
       
       window.localStorage.setItem("x-access-token",result.data);
       window.localStorage.setItem("authorization", result.data);
       window.localStorage.setItem("Authorization", result.data);
       this.toastr.success("Đăng Nhạp thành công!!!");
       this.goToPage();
     }
     else {
        this.toastr.warning("Vui Lòng Kiểm Tra Lại Tên Đăng Nhập Hoặc Mật Khẩu");
     
     }
   })
   }
  ngOnDestroy() {
  }
  goToPage(){
    this.Router.navigate(['/Category']);
  }

}
