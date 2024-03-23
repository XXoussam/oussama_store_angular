import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Item} from "../models/item";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Sales} from "../models/sales";
import {Owner} from "../models/owner";

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  private apiServerUrl=environment.apiBaseUrl;

  constructor(private http:HttpClient) { }

  loadSales(): Observable<Sales[]>{
    let headers = new HttpHeaders();
    headers.append('content-type', 'application/json');
    headers.append('accept', 'application/json');
    return this.http.get<Sales[]>(`${this.apiServerUrl}/rest/sales/api/allsales`,{headers:headers});

  }

  findOwnerById(id:number):Observable<Owner>{
    console.log(id)
    return this.http.get<Owner>(`${this.apiServerUrl}/rest/owner/api/findowner?id=`+id)
  }


}
