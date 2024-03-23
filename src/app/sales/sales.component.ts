import { Component, OnInit } from '@angular/core';
import {Sales} from "../models/sales";
import {SalesService} from "../service/sales.service";
import {Item} from "../models/item";
import {NgxSpinnerService} from "ngx-spinner";
import {Owner} from "../models/owner";

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  salesList:Sales[]=[];
  owner: Owner=new Owner();
  constructor(private salesService:SalesService,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.loadSales();
    this.getOwner(1);
  }

  loadSales(){
    this.spinner.show();
    this.salesService.loadSales().subscribe(
      (result:Sales[])=>{
        console.log('sales :',result)
        this.spinner.hide();
        console.log("sales fetched successfully");
        this.salesList=[];
        this.salesList.push.apply(this.salesList,result);
      },error => {
        this.spinner.hide();
        console.log("filed to fetch sales :",error)
        //this.buildMessageModal('An error occurs when retrieving categories data')
      }
    );
  }

  getOwner(id: number) {
    this.spinner.show();
    this.salesService.findOwnerById(id).subscribe(
      (res:Owner)=>{
        this.spinner.hide();
        console.log(res);
        this.owner = res;
      },error => {
        this.spinner.hide();
        alert(error.message)
      }
    );
  }

}
