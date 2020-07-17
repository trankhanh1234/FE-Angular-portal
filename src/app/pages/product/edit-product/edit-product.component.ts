import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/model/product.model';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { category } from 'src/app/model/category.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from 'src/app/service/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriService } from 'src/app/service/categogi.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  product : product[];
  public Editor = ClassicEditor;
  item : product = new product();
  productDetail : product;
  categori: category[]=[];
  image;
  hasError:boolean;
  mss_gs: string;
  registerForm: FormGroup;
  submitted = true;
  public onReady( editor ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
    );
  }
  constructor(private productservice : ProductService,
    private router : Router,
    private route: ActivatedRoute,
    private categoriservice: CategoriService,
    private toastr :ToastrService,
    private formBuilder: FormBuilder,) { }

  ngOnInit() {
    this.getCate();
    this.productDetail = new product();
    let id = this.route.snapshot.paramMap.get('idProduct');
    this.productservice.getProduct(id).subscribe((data : any) => {
      if(data.result == true)
      {
        this.productDetail = data.getProductById; 
        console.log(this.productDetail);
        this.setDefaultValue();
      }
    })

    this.registerForm =  this.formBuilder.group({
      title: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      price :['',Validators.compose([Validators.required, Validators.minLength(2)])],
      imageOld: [''],
      image :[''],
      quality: ['',Validators.compose([Validators.required, Validators.minLength(2)])],
      idCate :['',Validators.compose([Validators.required, Validators.minLength(5)])],
      description: ['']
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
  get f(){
    return this.registerForm.controls;
  }
  // get all categori
  getCate(){
    this.categoriservice.getCategory().subscribe((data:any)=> {
      this.categori = data.dataCate
      console.log(this.categori);
      
    })
  }
  // edit product
  editProduct(){
    this.setFormMarkAsTouch();
    const fd = new FormData();
    this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        this.productDetail._id = this.route.snapshot.paramMap.get('idProduct');
        
        fd.append("title", this.registerForm.get('title').value);
        fd.append("price", this.registerForm.get('price').value);
        fd.append("image", this.image);
        fd.append("imageOld", this.registerForm.get("imageOld").value);
        fd.append("quality", this.registerForm.get('quality').value);
        fd.append("description", this.registerForm.get('description').value);
        fd.append("idCate", this.registerForm.get('idCate').value);
        this.productDetail._id = this.route.snapshot.paramMap.get('idProduct');
        console.log(fd);

       this.productservice.editProduct(this.productDetail,fd).subscribe((data:any)=>{
        if(data.result == true)
        {
          this.toastr.success("Cập nhật thành công!!!");
          this.goToPage();
        }
        else 
        {
          this.mss_gs = "Vui lòng kiểm trả lại!!!";
          this.hasError = true
        }
      });
  }
  cancel(){
    this.goToPage();
  }
  //come back page product
  goToPage(){
    this.router.navigate(['/product']);
  }
  setFormMarkAsTouch() {
    this.registerForm.get("title").markAsTouched();
    this.registerForm.get("image").markAsTouched();
    this.registerForm.get("price").markAsTouched();
    this.registerForm.get("imageOld").markAsUntouched();
    this.registerForm.get("quality").markAsTouched()
    this.registerForm.get("description").markAsTouched();
    this.registerForm.get("idCate").markAsTouched();
  }

  setDefaultValue(){
    this.registerForm.get("title").setValue(this.productDetail.title);
    this.registerForm.get("image").setValue(this.productDetail.image);
    this.registerForm.get("price").setValue(this.productDetail.price);
    this.registerForm.get("imageOld").setValue(this.productDetail.image);
    this.registerForm.get("quality").setValue(this.productDetail.quality);
    this.registerForm.get("description").setValue(this.productDetail.description);
    this.registerForm.get("idCate").setValue(this.productDetail.idCate._id);
  }

}
