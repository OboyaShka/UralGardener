import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { CatalogPageComponent } from './catalog-page/catalog-page.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    CatalogPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, children: [
          {path: '', redirectTo: '/admin', pathMatch: 'full'},
          {path: 'catalog', component: CatalogPageComponent}
        ]
      }
    ])
  ],
  exports: [RouterModule],


})
export class AdminModule {

}
