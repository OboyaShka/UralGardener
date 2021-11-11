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
    ProfilePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule { }
