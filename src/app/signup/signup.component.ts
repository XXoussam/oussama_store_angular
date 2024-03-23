import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {NgxSpinnerService} from "ngx-spinner";
import {ClientService} from "../service/client.service";
import {Client} from "../models/client";
import {throwError} from "rxjs";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  emails:string[]=[];
  emailExist = false;

  constructor(private spinner:NgxSpinnerService,private clientService:ClientService) { }

  ngOnInit(): void {
  }


  verifyMails(email:string){
    this.spinner.show();
    this.clientService.allemails().subscribe(
      (result)=>{
        console.log(result)
        this.spinner.hide();
        this.emails=[];
        this.emails.push.apply(this.emails,result);
        if (this.emails.includes(email)){
          alert('this mail already exist')
        }
      },error => {
        this.spinner.hide();
      }
    );
  }

  signup(signupForm: NgForm) {
    let client = new Client();
    client.name = signupForm.value.name;
    client.email = signupForm.value.email;
    client.password = signupForm.value.userPassword;
    client.wallet = signupForm.value.wallet;

    this.clientService.saveClient(client).subscribe(
      (result:Client)=>{
        console.log(result)
      },error=>{
        alert('this Email already exist')
      }
    )

  }

}
