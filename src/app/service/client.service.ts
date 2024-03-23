import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Item} from "../models/item";
import {Client} from "../models/client";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiServerUrl=environment.apiBaseUrl;
  constructor(private http:HttpClient) { }
  requestHeader = new HttpHeaders(
    {"No-Auth":"True"}
  );

  allemails():Observable<any>{
    return this.http.get<any>(`${this.apiServerUrl}/rest/client/api/allemails`,
      {headers:this.requestHeader});
  }

  saveClient(client:Client):Observable<Client>{
    return this.http.post<Client>(`${this.apiServerUrl}/rest/client/api/addclient`,client,
      {headers:this.requestHeader});
  }

  allClients():Observable<Client[]>{
    return this.http.get<Client[]>(`${this.apiServerUrl}/rest/client/api/allclients`);
  }



}
