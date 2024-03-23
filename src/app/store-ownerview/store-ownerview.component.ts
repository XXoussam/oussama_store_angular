import { Component, OnInit } from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";
import {ItemService} from "../service/item.service";
import {Item} from "../models/item";
import {NgForm} from "@angular/forms";


@Component({
  selector: 'app-store-ownerview',
  templateUrl: './store-ownerview.component.html',
  styleUrls: ['./store-ownerview.component.css']
})
export class StoreOwnerviewComponent implements OnInit {
  public items:Item[]=[];
  public editItem!: Item | null;
  editmodel :boolean = false;



  constructor(private spinner:NgxSpinnerService,private itemService:ItemService) { }

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

  public onAddItem(addForm:NgForm):void{
    this.itemService.saveItem({
      name:addForm.value.name,
      imgUrl:addForm.value.imgUrl,
      price:addForm.value.price,
      description:addForm.value.description,
      totalExemplaries:addForm.value.totalExemplaries
    }).subscribe(
      (response:Item)=>{
        console.log(response)
        this.loadItems()
        addForm.reset();
      },error =>{
        alert(error.message)
        addForm.reset();
      }
    )
  }

  backToAddForm() {
    this.editItem=null;
    this.editmodel=false;
  }


  setUpdateItem(item:Item) {
    this.editmodel=true;
    console.log(item)
    this.editItem=item;
    window.scroll(80,80);
  }

  onUpdateItem(editForm:NgForm){
    this.itemService.updateItem({
      id:this.editItem?.id,
      name:editForm.value.name,
      imgUrl:editForm.value.imgUrl,
      price:editForm.value.price,
      description:editForm.value.description,
      totalExemplaries:editForm.value.totalExemplaries
    }).subscribe(
      (response:Item)=>{
        this.loadItems();
        editForm.reset();
      },error=>{
        alert(error.message);
        editForm.reset();
      }
    )
    this.editItem=null;
  }


  onDeleteItem(itemId:number|undefined):void {
    this.itemService.deleteItem(itemId).subscribe(
    res=>{
      this.loadItems();
    },error=>{
        alert(error.message)
      }
    )
  }

  onSearchItem(item: HTMLInputElement) {
    console.log(item.value)
    this.itemService.finditemByName(item.value).subscribe(
      (res:Item[])=>{
        console.log(res);
        this.items = res;
      },error => {
        alert(error.message)
      }
    );
    this.items=[];
  }
}
