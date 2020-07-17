import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogService } from 'src/app/service/blog.service';
import { Router, RouterLinkActive, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BlogModel } from 'src/app/model/blog.model';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.scss']
})
export class EditBlogComponent implements OnInit {
  public Editor = ClassicEditor;
  registerForm: FormGroup;
  submitted = false;
  p: number = 1;
  blog : BlogModel;
  image;
  hasError:boolean;
  mss_gs: string;

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
    private toastr : ToastrService,
    private route : ActivatedRoute) { }

  ngOnInit() {
    this.registerForm =  this.formBuilder.group({
      title: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      imageOld: [''],
      description: ['']
  }, );

    // call api by id
    let id = this.route.snapshot.paramMap.get('idBlog');
      this.blogservice.getBlogById(id).subscribe((data : any) => {
        if(data.result == true)
        {
          this.blog = data.getBlogById; 
          console.log(this.blog);
          this.setDefaultValue();
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
  editBlog(f){
    this.setFormMarkAsTouch();
    const fd = new FormData();
    this.submitted = true;

        // stop here if form is invalid
    if (this.registerForm.invalid) {
       return;
    }

    this.blog._id = this.route.snapshot.paramMap.get('idBlog');
        
        fd.append("title", this.registerForm.get('title').value);
        fd.append("image", this.image);
        fd.append("imageOld", this.registerForm.get("imageOld").value);
        fd.append("description", this.registerForm.get('description').value);
        console.log(fd);
        this.blogservice.editBlog(this.blog   ,fd).subscribe((result :any)=>{
          if(result.result == true)
          {
            this.blog = result.dataBlog;
            console.log(this.blog);
            this.goToPageBlog();
            this.toastr.success('Cập Nhật Thành Công!');
          } 
        })
  }
  goToPageBlog(){
    this.Router.navigate(['/Blog']);
  }
  //set value mark as touch
  setFormMarkAsTouch() {
    this.registerForm.get("title").markAsTouched();
    this.registerForm.get("imageOld").markAsUntouched();
    this.registerForm.get("description").markAsTouched();
  }
  //set value formControlName
  setDefaultValue(){
    this.registerForm.get("title").setValue(this.blog.title);
    this.registerForm.get("imageOld").setValue(this.blog.image);
    this.registerForm.get("description").setValue(this.blog.description);
  }

}
