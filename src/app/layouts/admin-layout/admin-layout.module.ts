import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoryComponent } from 'src/app/pages/categori/category/category.component';
import { EditCategoryComponent } from 'src/app/pages/categori/edit-category/edit-category.component';
import { ProductComponent } from 'src/app/pages/product/product/product.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { EditProductComponent } from 'src/app/pages/product/edit-product/edit-product.component';
import { ProviderComponent } from 'src/app/pages/provider/provider/provider.component';
import { EditProviderComponent } from 'src/app/pages/provider/edit-provider/edit-provider.component';
import { AdminComponent } from 'src/app/pages/admin/admin/admin.component';
import { EditAdminComponent } from 'src/app/pages/admin/edit-admin/edit-admin.component';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { CartComponent } from 'src/app/pages/admin/cart/cart/cart.component';
import { EditCartComponent } from 'src/app/pages/admin/cart/edit-cart/edit-cart.component';
import { BlogComponent } from 'src/app/pages/blog/blog/blog.component';
import { EditBlogComponent } from 'src/app/pages/blog/blog/edit-blog/edit-blog.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    ReactiveFormsModule,
    CKEditorModule,
    NgxPaginationModule,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    CategoryComponent,
    EditCategoryComponent,
    ProductComponent,
    EditProductComponent,
    ProviderComponent,
    EditProviderComponent,
    AdminComponent,
    EditAdminComponent,
    CartComponent,
    EditCartComponent,
    BlogComponent,
    EditBlogComponent,


  ]
})

export class AdminLayoutModule {}
