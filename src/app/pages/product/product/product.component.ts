import { Component, OnInit, ElementRef } from '@angular/core';
import { category } from 'src/app/model/category.model';
import { product } from 'src/app/model/product.model';
import { provider } from 'src/app/model/provider.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ProductService } from 'src/app/service/product.service';
import { CategoriService } from 'src/app/service/categogi.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  public Editor = ClassicEditor;
  product : product[]=[];
  setTime: any;
  newProduct = new product();
  categori: category[]=[];
  listCate : Array<category>;
  providerDetail : provider;
  newItem : product[];
  mss_gs : string ="";
  result : boolean = true;
  search :boolean = true;
  hasError : boolean = false;
  public form : FormGroup;
  registerForm: FormGroup;
  submitted = false;
  p: number = 1;
  image;

  selectedFile =null;
  public onReady( editor ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
    );
}
  constructor(private Productservice : ProductService,
    private categoriservice: CategoriService,
    private formBuilder: FormBuilder,
    private router : Router,
    private toastr : ToastrService,
  ) { }

  ngOnInit() {

    this.getAllProduct();
    this.getCate();
    this.setTime = moment().format('YYYY MM DD');
    this.registerForm = this.formBuilder.group({
      title: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      price :['',Validators.compose([Validators.required, Validators.minLength(5)])],
      image :[''],
      quality: ['',Validators.compose([Validators.required, Validators.minLength(5)])],
      idCate :['',Validators.compose([Validators.required, Validators.minLength(5)])],
      description: ['']
  }, );
  }
  get f(){
    return this.registerForm.controls;
  }
  // change event upload image
  onFileSelected(event){
    //this.selectedFile = <File>event.target.file[0];
    if( event.target.files.length >0)
    {
      const file = event.target.files[0];
      this.image = file;    }  
  }
  // get all data cate
  getCate(){
    this.categoriservice.getCategory().subscribe((data:any)=> {
      this.categori = data.dataCate
      console.log(this.categori);
      
    })
  }
  //get all data product
  getAllProduct(){
    this.Productservice.getAllProduct().subscribe((data : any) =>{          
      if(data.result == true)
      {
        this.product = data.getDataProduct; 
        console.log(this.product);
        
        this.search = true;
      }
      else 
      {
        this.mss_gs = "Vui lòng kiểm tra lại hệ thống";
      }
    })
  }
  createProduct(f){
    const fd = new FormData();   
    if (this.registerForm.invalid) {
      return;
    }
   fd.append('title',f.value.title);
   fd.append('price',f.value.price);
   fd.append('image',f.value.image);
   fd.append('quality',f.value.quality);
   fd.append('description',f.value.description);
   fd.append('idCate',f.value.idCate);
   fd.append('image',this.image);
    //call api new
    this.Productservice.newProduct(fd).subscribe((data : any)=>
       {  
         if(data.result == true)
         {
             this.product.unshift(data.dataProduct);
             //console.log(this.product);   
             this.toastr.success('Tạo thành công sản phẩm' + data.dataProduct.title);
         }  
         else if(data.result == false)
         {
          this.hasError = true;    
          this.mss_gs = "Sản Phẩm đã tồn tại!!";
         }
    })
  }
  DeleteProduct(_id:string){
    this.Productservice.deleteProduct(_id).subscribe(result => {
      this.product = this.product.filter(dataProduct => dataProduct._id != _id);
      this.toastr.success("Xóa Thành công!!!")!
     
    })
  }
  // let page eidt product
  goToPageEditProduct(product){
    this.router.navigate(['/editproduct/'+ product._id]);
  } 

}
