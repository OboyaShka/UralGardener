import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { CatalogPageComponent } from './catalog-page/catalog-page.component';
import { CreateCategoryComponent } from './shared/components/create-category/create-category.component';
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    AdminLayoutComponent,
    CatalogPageComponent,
    CreateCategoryComponent,
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

        ]
      }
    ])
  ],
  exports: [RouterModule],


})
export class AdminModule {

}
