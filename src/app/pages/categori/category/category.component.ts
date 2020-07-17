import { Component, OnInit } from '@angular/core';
import { category } from 'src/app/model/category.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriService } from 'src/app/service/categogi.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categori: category[]=[];
  getcate = new category();
  newcategori : category[];
  hasError: boolean = false;
  public form : FormGroup;
  search : boolean = true;
  hasErro : boolean = false;
  mss : string = "";
  registerForm: FormGroup;
  submitted = false;
  p=1;
  constructor(private categoriservice : CategoriService,
    private Router : Router,
    private formBuilder: FormBuilder,
    private toastr : ToastrService,) { }

  ngOnInit() {
    // lấy tất cả các loại
   
this.getDataCate();
    this.registerForm = this.formBuilder.group({
      title: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
  }, );
  }
  get f(){
    return this.registerForm.controls;
  }
  getDataCate(){
    this.categoriservice.getCategory().subscribe((data: any)=>{
      if(data.result == true){
        this.categori = data.dataCate;
        this.search;
      }
    })
  }
  createCate(f){  
   // console.log(f);
    this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
    this.getcate.title = f.value.title;
    
    this.categoriservice.newCategory(this.getcate.title).subscribe((data:any) =>{
      if(data.result == true)
      {
        this.categori.unshift(data.dataCate);
        this.toastr.success('Tạo thành công loại sản phẩm: ' + this.getcate.title);
      } 
      else
      {
      this.hasErro = true;     
       this.mss = data.error + " vui lòng kiểm tra lại!!!";
      }
     
    });
  }
  //delete

  DeleteDataCate(_id : string) {
    this.categoriservice.deleteCategory(_id).subscribe((data:any) => {
      if(data.result == true)
      {
        this.categori = this.categori.filter(
          dataCate => dataCate._id !== _id
        );
        this.toastr.success('Xóa thành công!');
      }
    });
  }

  goToPageEdit(categori : category ){
    this.Router.navigate(['/edit-cate/'+ categori._id]);
  }

}
