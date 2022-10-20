import { Routes } from '@angular/router';
import { ProductComponent } from '../material-component/dialog/product/product.component';
import { ManageCategoryComponent } from '../material-component/manage-category/manage-category.component';
import { ManageProductComponent } from '../material-component/manage-product/manage-product.component';

import { DashboardComponent } from './dashboard.component';

export const DashboardRoutes: Routes = [
  {path: '',component: DashboardComponent},
  {path: 'category',component: ManageCategoryComponent},
  {path: 'product',component: ManageProductComponent}
];
