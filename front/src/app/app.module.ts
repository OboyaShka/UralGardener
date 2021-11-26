import {NgModule, Provider} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShopLayoutComponent } from './shared/components/shop-layout/shop-layout.component';
import { MainPageComponent } from './main-page/main-page.component';
import { CatalogPageComponent } from './catalog-page/catalog-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { CategoryPageComponent } from './category-page/category-page.component';
import { DivisionPageComponent } from './division-page/division-page.component';
import { PositionPageComponent } from './position-page/position-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "./shared/shared.module";
import { RegisterPageComponent } from './register-page/register-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./shared/auth.interceptor";
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import {metaReducers, reducers} from "./reducers";
import {FilterProduct, getFilterProduct, totalPrice} from "./shared/pipes/filter-cart.pipe";
import {CartPageComponent} from "./cart-page/cart-page.component";
import {ShoppingCartEffects} from "./reducers/shopping-cart/shopping-cart.effects";

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
}

@NgModule({
  declarations: [
    AppComponent,
    ShopLayoutComponent,
    MainPageComponent,
    CatalogPageComponent,
    LoginPageComponent,
    CategoryPageComponent,
    DivisionPageComponent,
    PositionPageComponent,
    ProductPageComponent,
    RegisterPageComponent,
    ProfilePageComponent,
    CartPageComponent,
    FilterProduct,
    getFilterProduct,
    totalPrice
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([ShoppingCartEffects]),
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule { }
