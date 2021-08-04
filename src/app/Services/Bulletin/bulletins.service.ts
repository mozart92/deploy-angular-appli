import { Injectable } from '@angular/core';
import {API_USE} from '../../ServiceAPI/GeneralAPI';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BulletinM} from '../../Model/BulletinM';

@Injectable({
  providedIn: 'root'
})
export class BulletinsService {

  link = API_USE;

  constructor(private http : HttpClient) { }

  listAllBulletins() : Observable<BulletinM[]>{
   return this.http.get<BulletinM[]>(this.link+"/list-bulletins");
  }

  deleteBulletin(id){
    return this.http.get( `${this.link}/delete/itemBulletin/${id}`);
  }


}
