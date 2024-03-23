import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";
import {ItemService} from "../service/item.service";
import {Item} from "../models/item";
import {PusrchaseService} from "../service/pusrchase.service";
import {Purchase} from "../models/purchase";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  items: Item[] = [];
  addPurchases = false;
  itemid: number | undefined;
  @ViewChild('quantity') quantity!:ElementRef;

  constructor(private spinner:NgxSpinnerService,
              private itemService:ItemService,
              private purchaseService:PusrchaseService) { }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(){
    this.spinner.show();
    this.itemService.loadItems().subscribe(
      (result:Item[])=>{
        console.log('items :',result)
        this.spinner.hide();
        console.log("items fetched successfully");
        this.items=[];
        this.items.push.apply(this.items,result);
      },error => {
        this.spinner.hide();
        console.log("filed to fetch items :",error)
        //this.buildMessageModal('An error occurs when retrieving categories data')
      }
    );
  }

  addPurchase(item :Item) {
    this.addPurchases=!this.addPurchases
    this.itemid=item.id;
    console.log(this.itemid)
  }

  savePurchase(item:Item) {
    let purchase= new Purchase();
    if (item.id != null) {
      purchase.itemId = item.id;
    }
    purchase.quantity=this.quantity.nativeElement.value;
    this.purchaseService.savePurchase(purchase).subscribe(
      res=>{
        console.log(res)
        this.addPurchases=false
      },err=>{
        console.log(err)
      }
    )
  }
}
