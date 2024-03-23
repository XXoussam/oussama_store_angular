import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StoreOwnerviewComponent } from './store-ownerview/store-ownerview.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { SalesComponent } from './sales/sales.component';
import {AppRoutingModule} from "./app.routing.module";
import { HomeComponent } from './home/home.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import {AuthGuard} from "./auth/auth.guard";
import {AuthInterceptor} from "./auth/auth.interceptor";
import {UserService} from "./service/user.service";
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { SignupComponent } from './signup/signup.component';
import { MyclientsComponent } from './myclients/myclients.component';

@NgModule({
  declarations: [
    AppComponent,
    StoreOwnerviewComponent,
    SalesComponent,
    HomeComponent,
    PurchaseComponent,
    LoginComponent,
    HeaderComponent,
    ForbiddenComponent,
    SignupComponent,
    MyclientsComponent,


  ],
    imports: [
        BrowserModule, HttpClientModule, FormsModule,AppRoutingModule
    ],
  providers: [
    AuthGuard,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    },
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
