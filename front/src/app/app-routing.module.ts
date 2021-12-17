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
import {AuthGuard} from "./shared/auth.guard";
import {AdminGuard} from "./shared/admin.guard";
import {CartPageComponent} from "./cart-page/cart-page.component";
import {NotFoundPageComponent} from "./not-found-page/not-found-page.component";

const routes: Routes = [
  {
    path: '', component: ShopLayoutComponent, children: [
      {path: '', redirectTo: '/', pathMatch: 'full'},
      {path: '', component: MainPageComponent},
      {path: 'login', component: LoginPageComponent},
      {path: 'register', component: RegisterPageComponent},
      {path: 'cart', component: CartPageComponent},
      {path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuard]},
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
        path: 'admin', canActivate: [AuthGuard, AdminGuard], loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
      },
    ]
  },
  {path: '404', component: NotFoundPageComponent},
  {path: '**', redirectTo: '/404'}
  ]

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
