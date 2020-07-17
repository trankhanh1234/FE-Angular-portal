import { Component, OnInit } from '@angular/core';
import { adminmodel } from 'src/app/model/admin.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from 'src/app/service/admin.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  admin : adminmodel[]=[];
  item : adminmodel = new adminmodel();
  hasError : boolean;
  
  mss_gs : string;
  image;
  search : boolean;
  registerForm: FormGroup;
  constructor(private adminservice : AdminService,
    private toastr : ToastrService,
    private router : Router,
    private formBuilder: FormBuilder,) { }

  ngOnInit() {
    this.getAllAdmin();
    //
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.email, Validators.minLength(5)])],
      password :['',Validators.compose([Validators.required, Validators.minLength(5)])],
      avatar:[''],
      position:[''],
  }, );
  }
  // change event upload image
  onFileSelected(event){
    //this.selectedFile = <File>event.target.file[0];
    if( event.target.files.length >0)
    {
      const file = event.target.files[0];
      this.image = file;
      console.log(file); 
    }  
  }

  getAllAdmin(){
    this.adminservice.getAllAdmin().subscribe((data:any)=>{
      if(data.result == true)
      {
        this.search = true;
        this.admin = data.data;
      }
    })
  }
  
  get f(){
    return this.registerForm.controls;
  }
  createAdmin(f){
    console.log(f);
    const fd = new FormData(); 
    fd.append('username' , f.value.username, )
    fd.append('password' , f.value.password, )
    fd.append('avatar' , f.value.avatar, )
    fd.append('position' , f.value.position )
    fd.append('avatar' , this.image, )
    this.adminservice.newAdmin(fd).subscribe((data :any)=>{
      if(data.result == true)
      {
        this.item = data.data;
        this.admin.unshift(data.data);
        this.toastr.success('Tạo thành công với username '+  this.item.username )
      }
      else
      {
          this.mss_gs = "Tên đã tồn tại!! Vui lòng kiểm tra lại";
          this.hasError = true;
      }
    })
  }
  delete(_id:string){
    console.log(_id);
    this.adminservice.deleteAdmin(_id).subscribe((data:any)=>{
      if(data.result == true)
      {
        this.admin = this.admin.filter(
          data => data._id !== _id
        );
        this.toastr.success('Xóa thành công!');
      }
      else
      {
          this.mss_gs = "Vui lòng kiểm tra lại";
          this.hasError = true;
      }
    }
    )
  }
  // => edit
  goToPageEdit(item){
    this.router.navigate(['/admin/edit/'+item._id]);
  }


}
