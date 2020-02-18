import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class APIService {

  private apiKey: string = "9b08a5f2";
  private strType : string = '';
  private strSearch: string  ='';
  private strPageNumber: string = '';
  private baseUrl: string = `http://www.omdbapi.com/?apikey=${this.apiKey}`;

  constructor(private http: HttpClient) { }

  getApi():Observable<any>{
    return this.http.get(this.baseUrl+'&s='+this.strSearch+'&type='+this.strType+'&page='+this.strPageNumber);
  }

  setType(type: string){
    this.strType = type;
  }

  setSearch(word: string){
    this.strSearch = word;
  }

  setPageNumber(number: string){
    this.strPageNumber = number;
  }

}
