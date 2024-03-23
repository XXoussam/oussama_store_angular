import { Component, OnInit } from '@angular/core';
import {Sales} from "../models/sales";
import {SalesService} from "../service/sales.service";
import {NgxSpinnerService} from "ngx-spinner";
import {Client} from "../models/client";
import {ClientService} from "../service/client.service";
import {ClientManager} from "../models/clientManager";

@Component({
  selector: 'app-myclients',
  templateUrl: './myclients.component.html',
  styleUrls: ['./myclients.component.css']
})

export class MyclientsComponent implements OnInit {

  clientList:Client[]=[];
  clientManagerList:ClientManager[]=[];
  salesList:Sales[]=[] ;
  constructor(private clientService:ClientService,
              private spinner:NgxSpinnerService,
              private salesService:SalesService) { }

  ngOnInit(): void {
    this.loadClients();

  }

  loadClients(){
    this.spinner.show();
    this.clientService.allClients().subscribe(
      (result:Client[])=>{
        console.log('clients :',result)
        this.spinner.hide();
        console.log("clients fetched successfully");
        this.clientList=[];
        this.clientList.push.apply(this.clientList,result);
        this.clientList.forEach(client=>{
          let c = new ClientManager();
          c.name=client.name;
          c.email=client.email;
          c.spend=0;
          this.loadSales();
          this.clientManagerList.push(c);
        })
        console.log(this.clientManagerList)
      },error => {
        this.spinner.hide();
        console.log("filed to fetch clients :",error)
        //this.buildMessageModal('An error occurs when retrieving categories data')
      }
    );
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
        this.clientManagerList.forEach(client=>{
          let s=0;
          this.salesList.forEach(sale=>{
            if (client.email == sale.email){
              s=s+(sale.price*sale.quantitySold);
            }
          })
          client.spend = s;
        })
        console.log(this.clientManagerList)
      },error => {
        this.spinner.hide();
        console.log("filed to fetch sales :",error)
        //this.buildMessageModal('An error occurs when retrieving categories data')
      }
    );
  }

}
