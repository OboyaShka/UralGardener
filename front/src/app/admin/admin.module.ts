import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { CatalogPageComponent } from './catalog-page/catalog-page.component';
import {SharedModule} from "../shared/shared.module";
import { CreateCategoryComponent } from './shared/components/create-category/create-category.component';
import { CreateDivisionComponent } from './shared/components/create-division/create-division.component';
import { CreatePositionComponent } from './shared/components/create-position/create-position.component';
import { CreateProductComponent } from './shared/components/create-product/create-product.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    CatalogPageComponent,
    CreateCategoryComponent,
    CreateDivisionComponent,
    CreatePositionComponent,
    CreateProductComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, children: [
          {path: '', redirectTo: '/admin', pathMatch: 'full'},
          {path: 'catalog', component: CatalogPageComponent},
          {path: 'create-category', component: CreateCategoryComponent},
          {path: 'create-division', component: CreateDivisionComponent},
          {path: 'create-position', component: CreatePositionComponent},
          {path: 'create-product', component: CreateProductComponent},
        ]
      }
    ])
  ],
  exports: [RouterModule],


})
export class AdminModule {

}
