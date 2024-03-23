import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Item} from "../models/item";
import {Purchase} from "../models/purchase";
import {NgxSpinnerService} from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})
export class PusrchaseService {

  private apiServerUrl=environment.apiBaseUrl;

  constructor(private http:HttpClient) { }

  loadPurchases(): Observable<Purchase[]>{
    let headers = new HttpHeaders();
    headers.append('content-type', 'application/json');
    headers.append('accept', 'application/json');
    return this.http.get<Purchase[]>(`${this.apiServerUrl}/rest/purchase/api/findpurchasebyclient`,{headers:headers});

  }

  updatePurchase(purchase:Purchase):Observable<Purchase>{
    return this.http.put<Purchase>(`${this.apiServerUrl}/rest/purchase/api/updatepurchase`,purchase);
  }

  deletePurchase(id: number | undefined):Observable<any>{
    return this.http.delete(`${this.apiServerUrl}/rest/purchase/api/deletepurchase/${id}`);
  }

  savePurchase(purchase:Purchase):Observable<Purchase>{
    return this.http.post<Purchase>(`${this.apiServerUrl}/rest/purchase/api/addpurchase`,purchase);
  }

  buy():Observable<any>{
    return this.http.put(`${this.apiServerUrl}/rest/purchase/api/buy`,null);
  }


}
