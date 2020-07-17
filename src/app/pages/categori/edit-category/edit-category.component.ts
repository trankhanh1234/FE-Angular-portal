import { Component, OnInit } from '@angular/core';
import { category } from 'src/app/model/category.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriService } from 'src/app/service/categogi.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  category : category[];
  item : category = new category();
  mss_gs : string;
  hasError : boolean;
  registerForm: FormGroup;
  submitted : boolean;
  public form : FormGroup;
  constructor(private categoriservice : CategoriService,
    private route: ActivatedRoute,
    private toastr : ToastrService,
    private router : Router,
    private formBuilder: FormBuilder,) { }

  ngOnInit() {
    this.getCategoryById();
    this.registerForm = this.formBuilder.group({
      title: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
     
    }, );

  }
  get f(){
    return this.registerForm.controls;
  }

  getCategoryById(){
    let id = this.route.snapshot.paramMap.get("idCate");
      this.categoriservice.getCategoryById(id).subscribe((data:any)=>{
          this.item = data.dataCate;
          console.log(this.item.title);
          
      }
      )
  }

  editCate(f){
    console.log(f);
    this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
    this.item.title = f.value.title;
    
    this.categoriservice.editCate(this.item._id, (this.item.title)).subscribe((data:any) =>{
      if(data.result == true)
      {
        this.toastr.success('Sửa thành công ' + this.item.title),
        this.goToPageCate();
      }
      else{
          this.mss_gs = "Tên trùng!! Vui lòng kiểm tra lại!!!!";
          this.hasError = true;
      }
    });
  }
  cancel(){
    this.goToPageCate();
  }

  goToPageCate(){
    this.router.navigate(['/Category']);
  }


}
