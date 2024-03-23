import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {StoreOwnerviewComponent} from "./store-ownerview/store-ownerview.component";
import {SalesComponent} from "./sales/sales.component";
import {HomeComponent} from "./home/home.component";
import {PurchaseComponent} from "./purchase/purchase.component";
import {LoginComponent} from "./login/login.component";
import {ForbiddenComponent} from "./forbidden/forbidden.component";
import {AuthGuard} from "./auth/auth.guard";
import {SignupComponent} from "./signup/signup.component";
import {MyclientsComponent} from "./myclients/myclients.component";


const routes: Routes = [
  {path: '', component: StoreOwnerviewComponent,canActivate:[AuthGuard],data:{roles:['Owner']}},
  {path: 'sales', component: SalesComponent,canActivate:[AuthGuard],data:{roles:['Owner']}},
  {path: 'myclients', component: MyclientsComponent,canActivate:[AuthGuard],data:{roles:['Owner']}},
  {path: 'home', component: HomeComponent,canActivate:[AuthGuard],data:{roles:['Client']}},
  {path: 'purchase', component: PurchaseComponent,canActivate:[AuthGuard],data:{roles:['Client']}},
  {path: 'login', component: LoginComponent},
  {path: 'forbidden', component: ForbiddenComponent},
  {path: 'signup', component: SignupComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
