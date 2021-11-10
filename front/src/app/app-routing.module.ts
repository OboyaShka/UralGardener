import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ShopLayoutComponent} from "./shared/components/shop-layout/shop-layout.component";
import {MainPageComponent} from "./main-page/main-page.component";
import {CatalogPageComponent} from "./catalog-page/catalog-page.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {CategoryPageComponent} from "./category-page/category-page.component";
import {PositionPageComponent} from "./position-page/position-page.component";
import {DivisionPageComponent} from "./division-page/division-page.component";
import {ProductPageComponent} from "./product-page/product-page.component";
import {RegisterPageComponent} from "./register-page/register-page.component";
import {ProfilePageComponent} from "./profile-page/profile-page.component";

const routes: Routes = [
  {
    path: '', component: ShopLayoutComponent, children: [
      {path: '', redirectTo: '/', pathMatch: 'full'},
      {path: '', component: MainPageComponent},
      {path: 'login', component: LoginPageComponent},
      {path: 'register', component: RegisterPageComponent},
      {path: 'profile', component: ProfilePageComponent},
      {path: 'catalog', component: CatalogPageComponent, children: [
          {
            path: ':id', component: CategoryPageComponent, children: [
              {
                path: ':id', component: DivisionPageComponent, children: [
                  {
                    path: ':id', component: PositionPageComponent, children: [
                      {path: ':id', component: ProductPageComponent}
                    ]
                  },
                ]
              },
            ]
          }
        ]
      },
      {
        path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
      }
    ]
  }]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
