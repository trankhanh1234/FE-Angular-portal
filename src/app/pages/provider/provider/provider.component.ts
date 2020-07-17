import { Component, OnInit } from '@angular/core';
import { provider } from 'src/app/model/provider.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProviderService } from 'src/app/service/provider.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.scss']
})
export class ProviderComponent implements OnInit {
  provider : provider[]=[];
  providers :provider[]; 
  item : provider = new provider();
  image;
  hasError: boolean;
  mss_gs : string;
  registerForm: FormGroup;
  submitted = false;
  selectedFile =null;
  search;

  constructor(private providerservice : ProviderService,
    private router : Router,
    private toastr : ToastrService,
    private formBuilder: FormBuilder,
   ) { }

  ngOnInit() {
    this.providerservice.getAllProvider().subscribe((data : any) =>{
      this.provider = data.data;
      console.log(this.provider);
      this.search = true;
    })
    
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.email, Validators.minLength(5)])],
      password :['',Validators.compose([Validators.required, Validators.minLength(9)])],
      phoneNumber :[''],
      address: ['',Validators.compose([Validators.required, Validators.minLength(5)])],
      avatar :[''],
  }, );
  }

  get f(){
    return this.registerForm.controls;
  }
  //select file upload image
  onFileSelected(event){
    //this.selectedFile = <File>event.target.file[0];
    if( event.target.files.length >0)
    {
      const file = event.target.files[0];
      this.image = file;
      console.log(file); 
    }  
  }
  getAllProvider(){
    this.providerservice.getAllProvider().subscribe((data : any) =>{
      this.provider = data.data;
      console.log(this.provider);
      this.search = true;
    })
  }
  
  createProvider(f){
    const fd = new FormData(); 
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    } 
    fd.append('username',f.value.username );
    fd.append('password',f.value.password );
    fd.append('avatar',f.value.avatar);
    fd.append('avatar', this.image);
    fd.append('phoneNumber',f.value.phoneNumber );
    fd.append('address',f.value.address );
    console.log(fd);
    this.providerservice.createPRovider(fd).subscribe((data:any)=>{
      if(data.result == true)
      {
        this.provider.unshift(data.data);
        this.toastr.success("Tạo thành công!!" + data.username);
      }
      else{
        this.mss_gs = "Trùng tên! Vui lòng kiểm tra lai!!!";
        this.hasError = true;
      }
    })

  }

  deleteProvider(_id : string){
    this.providerservice.deleteProvider(_id).subscribe((data:any)=> {
      if(data.result == true)
      {
        this.provider = this.provider.filter(dataProvider => dataProvider._id != _id);
        this.toastr.success("Xóa thành công!!!");
      }
    })
  }
  // => edit
  goToPageEditProvider(provider){
    this.router.navigate(['/provider/edit/' + provider._id]);
  }
}
