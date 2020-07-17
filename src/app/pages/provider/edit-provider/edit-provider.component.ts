import { Component, OnInit } from '@angular/core';
import { provider } from 'src/app/model/provider.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProviderService } from 'src/app/service/provider.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-provider',
  templateUrl: './edit-provider.component.html',
  styleUrls: ['./edit-provider.component.scss']
})
export class EditProviderComponent implements OnInit {
  provider : provider[];
  item : provider = new provider();
  image;
  mss_gs : string;
  hasError :  boolean;
  registerForm: FormGroup;
  submitted = true;
  providerDetail:provider;

  constructor(  private formBuilder: FormBuilder,
    private providerservice : ProviderService,
    private router : Router,
    private route : ActivatedRoute,
    private toastr : ToastrService
    ) { }

  ngOnInit() {
    this.getProviderById();
    this.providerDetail = new provider();

   //form
   this.registerForm =  this.formBuilder.group({
    username: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
    password :['',Validators.compose([Validators.required, Validators.minLength(5)])],
    avatar :[''],
    phoneNumber: ['',Validators.compose([Validators.required, Validators.minLength(5)])],
    address :['',Validators.compose([Validators.required, Validators.minLength(5)])],
}, );

  }
  get f(){
    return this.registerForm.controls;
  }
  onFileSelected(event){
    //this.selectedFile = <File>event.target.file[0];
    if( event.target.files.length >0)
    {
      const file = event.target.files[0];
      this.image = file;
      console.log(file); 
    }  
  }
  getProviderById(){
    let id = this.route.snapshot.paramMap.get('idProvider');
    this.providerservice.getProviderById(id).subscribe((data:any)=>{
      if(data.result == true)
      {
        this.providerDetail = data.data; 
        console.log(this.providerDetail);
        
        this.setDefaultValue();
      }
       
    }
    )
  }
  editProvider(f){
    const fd = new FormData();
    fd.append('username' , this.registerForm.get("username").value );
    fd.append('password' , this.registerForm.get("password").value, );
    fd.append('avatar' ,this.image, );
    fd.append("imageOld", this.registerForm.get("avatar").value,);
    fd.append('phoneNumber' , this.registerForm.get("phoneNumber").value, );
    let id = this.route.snapshot.paramMap.get('idProvider');
    //username, password, fullname, avatar, phonename, address, status, keyActive
    // this.item.username = f.value.username;
    // this.item.password = f.value.password;
    // this.item.avatar = this.image;
    // this.item.phoneNumber = f.value.phoneNumber;
    // this.item.address = f.value.address;
    
    console.log(this.item);
    
    this.providerservice.updateProvider(id, fd).subscribe((data:any)=>{
        if(data.result == true)
        {
          this.toastr.success("Cập nhật Thành công!!!");
          this.goToPage();
        }
        else{
          this.mss_gs = "Trùng Tên! Vui lòng kiểm tra lại!!!";
          this.hasError = true;
        }
      })

  }

  cancel(){
    this.goToPage();
  }
  goToPage(){
    this.router.navigate(["/provider"]);
  }

  setFormMarkAsTouch() {
    this.registerForm.get("username").markAsTouched();
    this.registerForm.get("password").markAsTouched();
    this.registerForm.get("avatar").markAsTouched();
    this.registerForm.get("phoneNumber").markAsTouched()
    this.registerForm.get("address").markAsTouched();
  }
  setDefaultValue(){
    this.registerForm.get("username").setValue(this.providerDetail.username);
    this.registerForm.get("password").setValue(this.providerDetail.password);
    this.registerForm.get("avatar").setValue(this.providerDetail.avatar);
    this.registerForm.get("phoneNumber").setValue(this.providerDetail.phoneNumber);
    this.registerForm.get("address").setValue(this.providerDetail.address);
  }



}
