import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { CategoryComponent } from 'src/app/pages/categori/category/category.component';
import { EditCategoryComponent } from 'src/app/pages/categori/edit-category/edit-category.component';
import { ProductComponent } from 'src/app/pages/product/product/product.component';
import { EditProductComponent } from 'src/app/pages/product/edit-product/edit-product.component';
import { ProviderComponent } from 'src/app/pages/provider/provider/provider.component';
import { EditProviderComponent } from 'src/app/pages/provider/edit-provider/edit-provider.component';
import { AdminComponent } from 'src/app/pages/admin/admin/admin.component';
import { EditAdminComponent } from 'src/app/pages/admin/edit-admin/edit-admin.component';
import { CartComponent } from 'src/app/pages/admin/cart/cart/cart.component';
import { EditCartComponent } from 'src/app/pages/admin/cart/edit-cart/edit-cart.component';
import { BlogComponent } from 'src/app/pages/blog/blog/blog.component';
import { EditBlogComponent } from 'src/app/pages/blog/blog/edit-blog/edit-blog.component';
// import { AuthGuardService as AuthGuard  } from './../../service/Auth.Guard';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },

    { path: 'Category',           component: CategoryComponent },
    { path: 'edit-cate/:idCate',           component:  EditCategoryComponent },
    { path: 'product',           component: ProductComponent },
    { path: 'editproduct/:idProduct',           component: EditProductComponent },
    { path: 'provider',           component: ProviderComponent },
    { path: 'provider/edit/:idProvider',           component: EditProviderComponent },
    { path: 'admin',           component: AdminComponent },
    { path: 'admin/edit/:idAdmin',           component: EditAdminComponent },
    { path: 'cart',           component: CartComponent },
    { path: 'cart/:idCart',           component: EditCartComponent },
    { path: 'Blog' , component: BlogComponent},
    { path: 'blog/edit/:idBlog' , component: EditBlogComponent}

];
