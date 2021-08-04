import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_USE} from '../ServiceAPI/GeneralAPI';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  link: String= API_USE+"/searchGroup";

  constructor(private http: HttpClient) { }

  findByKey(key){
    console.log(key)
     return   this.http.get(this.link+"/"+key);
  }

}
