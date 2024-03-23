import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {UserService} from "../service/user.service";
import {UserAuthService} from "../service/user-auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private router: Router,
              private userService:UserService,
              private userAuthService:UserAuthService) { }

  ngOnInit() {
  }


  login(loginForm: NgForm) {
    this.userService.login(loginForm.value).subscribe(
      (response:any)=>{
        console.log(response);
        console.log(response.jwtToken);
        console.log(response.user.roles);
        this.userAuthService.setRoles(response.user.roles)
        this.userAuthService.setToken(response.jwtToken)
        const role = response.user.roles[0].roleName;
        if (role === 'Owner'){
          this.router.navigate(["/"]);
        }else {
          this.router.navigate(["/home"]);
        }
      },error => {
        console.log(error)
      }
    );

  }
}
