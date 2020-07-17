import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BlogModel } from 'src/app/model/blog.model';
import { BlogService } from 'src/app/service/blog.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  public Editor = ClassicEditor;
  public form : FormGroup;
  registerForm: FormGroup;
  submitted = false;
  p: number = 1;
  blog : BlogModel[]=[];
  image;

  selectedFile =null;
  public onReady( editor ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
    );
  }


  constructor(private formBuilder: FormBuilder,
    private blogservice : BlogService,
    private Router : Router,
    private toastr : ToastrService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      title: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      image :[''],
      description: ['']
  }, );

  //call api get all data
  this.blogservice.getAllBlog().subscribe((result : any)=>{
    if(result.result == true)
    {
      this.blog = result.getDataBlog.dataBlog;
      console.log(this.blog);
      
    }
  })
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
  createBlog(f){
    console.log(this.registerForm.value);
    const fd = new FormData();  
    fd.append('title',f.value.title);
   fd.append('description',f.value.description);
   fd.append('image',this.image);
    this.blogservice.newBlog(fd).subscribe((result : any)=>{
     if(result.result == true)
      {
        this.blog.unshift(result.getDataBlog.dataBlog);
        this.toastr.success('Tạo thành công loại sản phẩm');
      } 
      else
      {
      //  this.mss = data.error + " vui lòng kiểm tra lại!!!";
      //  this.hasErro = true;     
      }

    })

  }
  goToPageEdit(blog){
    this.Router.navigate(['blog/edit/'+ blog._id]);
    console.log(blog._id);
    
  }
  DeleteProduct(_id:string){
    this.blogservice.deleteBlog(_id).subscribe(data => {
     
        this.blog = this.blog.filter(dataProduct => dataProduct._id != _id);
        this.toastr.success('Xóa thành công!');
      
    
    })
  }


}
