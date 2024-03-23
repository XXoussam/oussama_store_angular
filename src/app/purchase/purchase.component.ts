import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Purchase} from "../models/purchase";
import {PusrchaseService} from "../service/pusrchase.service";
import {NgxSpinnerService} from "ngx-spinner";
import {Item} from "../models/item";
import {ItemService} from "../service/item.service";

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {
  public purchases:Purchase[]=[];
  public item:Item|undefined;
  createNewInput=false;
  items : Item[]=[];
  itemid:number | undefined;
  @ViewChild('newQuantity') newQuantity!:ElementRef;

  constructor(private purchaseService:PusrchaseService,
              private spinner:NgxSpinnerService,
              private itemService:ItemService) { }

  ngOnInit(): void {
    this.loadPurchase();
  }

  loadPurchase(){
    this.spinner.show();
    this.purchaseService.loadPurchases().subscribe(
      (res:Purchase[])=>{
        this.spinner.hide();
        console.log("purchases fetched successfully");
        this.purchases=[];
        this.purchases.push.apply(this.purchases,res);

        if (this.purchases.length>0){
          res.forEach(purchase=>{
            this.getItemFromPurchase(purchase.itemId);
          })
        }

      },error => {
      this.spinner.hide();
      console.log("filed to fetch purchases :",error)
      //this.buildMessageModal('An error occurs when retrieving categories data')
    }
    );
  }

  getItemFromPurchase(id:number){
    this.spinner.show();
    this.itemService.finditemById(id).subscribe(
      response=>{
        this.spinner.hide();
        this.item = response;
          // @ts-ignore
        this.items.push(response);

      },error=>{
        this.spinner.hide();
        console.log(error)
      }
    );

  }


  createNewInputFields(item:Item) {
    this.createNewInput=!this.createNewInput
    this.itemid=item.id;
    console.log(this.itemid)
  }


  savePurchase(purchase:Purchase) {
    console.log(purchase)
    purchase.quantity = this.newQuantity.nativeElement.value;
    console.log(this.newQuantity.nativeElement.value)
      this.purchaseService.updatePurchase(purchase).subscribe(
        (response:Purchase)=>{
          console.log(response);
        },error=>{
          alert(error.message);
        }
      )
    this.createNewInput = false;
    }

    getQuantityFromItem(itemId:number):number{
    let quantity = 0
      this.purchases.forEach(
        purchase=>{
        if (purchase.itemId == itemId){
          quantity = purchase.quantity
        }
      })
      return quantity;
    }

    getPurchaseFromItem(itemId:number):Purchase{
      let pur:Purchase;
      this.purchases.forEach(
        purchase=>{
          if (purchase.itemId == itemId){
            pur = purchase
          }
        }
      )
      // @ts-ignore
      return pur;
    }


  deletePurchase(id:number) {
    this.purchases.forEach(purchase=>{
      if (purchase.itemId == id){
        this.purchaseService.deletePurchase(purchase.id).subscribe(res=>{
          console.log(res)
            this.purchases=[];
             this.items=[];
            console.log(this.purchases)
            this.loadPurchase();
        },error => {
          console.log(error)
          }
        )
      }
    })
  }

  getTotalPrice():number {
    let s = 0;
    this.items.forEach(item=>{
      s=s+(this.getQuantityFromItem(item.id!)*item.price);
    })
    return s;
  }

  buy() {
    this.purchaseService.buy().subscribe(
      res=>{
        console.log(res)
        this.purchases=[];
        this.items=[];
        this.loadPurchase();
      },error => {
        console.log(error);
      }
    );
  }
}
