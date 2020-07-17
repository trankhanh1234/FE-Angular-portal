import { Component, OnInit } from '@angular/core';
import { adminmodel } from 'src/app/model/admin.model';
import { AdminService } from 'src/app/service/admin.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.scss']
})
export class EditAdminComponent implements OnInit {
  item : adminmodel=new adminmodel();
  image;
  registerForm: FormGroup;
  submitted ;

  constructor( private adminservice : AdminService,
    private toastr : ToastrService,
    private router : Router,
    private formBuilder: FormBuilder,
    private route : ActivatedRoute) { }

  ngOnInit() {
    this.getAdmin();
    ///form validated
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.email, Validators.minLength(5)])],
      password :[''],
      avatar:[''],
      position:['',{ disabled:true}],
  }, );
  }
   // change event upload image
   onFileSelected(event){
    //this.selectedFile = <File>event.target.file[0];
    if( event.target.files.length >0)
    {
      const file = event.target.files;
      this.image = file;
      console.log(file); 
    }  
  }
  getAdmin(){
    let id = this.route.snapshot.paramMap.get("idAdmin");
    this.adminservice.getAdminById(id).subscribe((data:any)=>{
      this.item = data.data;
      console.log(this.item);
      this.setDefaultValue();
    })
  }
  get f(){
    return this.registerForm.controls;
  }
  editAdmin(f){
    const fd = new FormData();
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    fd.append('avatar' , this.image, )
    fd.append("username", this.registerForm.get('username').value);
    fd.append("password", this.registerForm.get('password').value);
    fd.append("position", this.registerForm.get('position').value);


  
    this.adminservice.uploadAdmin(this.item._id,fd).subscribe((data:any)=>{
      if(data.result == true)
      {
          this.item = data.data;
          this.toastr.success("Sửa thành công tài khoản" + this.item.username);
          this.goToPageAdmin();
      }
    })
  }

  // come back page admin!!
  goToPageAdmin(){
    this.router.navigate(["/admin"]);
  }
  cancel(){
    this.goToPageAdmin();
  }

  setFormMarkAsTouch() {
    this.registerForm.get("username").markAsTouched();
    this.registerForm.get("password").markAsTouched();
    this.registerForm.get("avatar").markAsTouched();
    this.registerForm.get("position").markAsTouched();
    this.registerForm.get("imageOld").markAsUntouched();
  
  }
  setDefaultValue(){
    this.registerForm.get("username").setValue(this.item.username);
    this.registerForm.get("password").setValue(this.item.password);
    
    this.registerForm.get("avatar").setValue(this.item.avatar);
    this.registerForm.get("imageOld").setValue(this.item.avatar);
    this.registerForm.get("position").setValue(this.item.position);
    
  }

  


}
