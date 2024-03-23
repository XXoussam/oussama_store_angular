import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Item} from "../models/item";
import {catchError, Observable, of, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiServerUrl=environment.apiBaseUrl;

  constructor(private http:HttpClient) { }

  loadItems(): Observable<Item[]>{
    let headers = new HttpHeaders();
    headers.append('content-type', 'application/json');
    headers.append('accept', 'application/json');
    return this.http.get<Item[]>(`${this.apiServerUrl}/rest/item/api/allitems`,{headers:headers});
  }

  saveItem(item:Item):Observable<Item>{
    return this.http.post<Item>(`${this.apiServerUrl}/rest/item/api/additem`,item);
  }

  updateItem(item:Item):Observable<Item>{
    return this.http.put<Item>(`${this.apiServerUrl}/rest/item/api/updateitem`,item);
  }

  deleteItem(itemId:number|undefined):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/rest/item/api/deleteitem/${itemId}`)
  }

  finditemByName(itemName:String):Observable<Item[]>{
    return this.http.get<Item[]>(`${this.apiServerUrl}/rest/item/api/finditemByName?name=`+itemName)
  }

  finditemById(id:number):Observable<Item|undefined>{
    return this.http.get<Item>(`${this.apiServerUrl}/rest/item/api/finditem?id=`+id).pipe(
      tap(response=> console.table(response)),
      catchError(err=> {console.error(err); return of(undefined);})
    )
  }




}
