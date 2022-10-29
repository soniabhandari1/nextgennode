import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { FullComponent } from './layouts/full/full.component';
import { ChangePasswordComponent } from './material-component/dialog/change-password/change-password.component';
import { ManageCategoryComponent } from './material-component/manage-category/manage-category.component';
import { ManageOrderComponent } from './material-component/manage-order/manage-order.component';
import { ManageProductComponent } from './material-component/manage-product/manage-product.component';
import { ManageUserComponent } from './material-component/manage-user/manage-user.component';
import { ViewBillComponent } from './material-component/view-bill/view-bill.component';
import { RouteGuardService } from './services/route-guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'dashboard',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full',
        component: DashboardComponent,
      },

      {
        path: '',
        loadChildren: () =>
          import('./material-component/material.module')
          .then(
            (m) => m.MaterialComponentsModule
          ),
        canActivate: [RouteGuardService],
        data: {
          expectedRole: ['admin', 'user'],
        },
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
        canActivate: [RouteGuardService],
        data: {
          expectedRole: ['admin', 'user'],
        },
      },
      
    ],
  },
  { path: 'category', component: ManageCategoryComponent },
  { path:'product',component:ManageProductComponent},
  { path:'order',component:ManageOrderComponent},
  { path:'bill',component:ViewBillComponent},
  { path:'user',component:ManageUserComponent},


  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
