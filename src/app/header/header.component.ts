import { Component, OnInit } from '@angular/core';
import {UserAuthService} from "../service/user-auth.service";
import {Router} from "@angular/router";
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private userAuthService:UserAuthService,
              private router:Router,
              public userService:UserService) { }

  ngOnInit(): void {
  }

  public isLoggedIn(){
    return this.userAuthService.isLoggedIn();
  }

  logout() {
    this.userAuthService.clear();
    this.router.navigate(['/login']);
  }
}
