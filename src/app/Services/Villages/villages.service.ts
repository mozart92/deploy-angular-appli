import { Injectable } from '@angular/core';
import {API_USE} from '../../ServiceAPI/GeneralAPI';
import {HttpClient} from '@angular/common/http';
import {VillagesM} from '../../Model/VillagesM';


@Injectable({
  providedIn: 'root'
})
export class VillagesService {

  public  host:string= API_USE;

  constructor(private http:HttpClient) { }

  public getVillage(){
    return this.http.get(this.host+"/village");
  }

  saveVillage(dataForm : VillagesM) {
    return this.http.post(this.host+"/sauvegarder-village", dataForm);
  }

  updateVillage(id , dataForm : VillagesM) {
    return this.http.put(`${this.host}/village/${id}`, dataForm);
  }

  deleteVillage(id: number) {
    return this.http.delete(`${this.host}/village/${id}`, {responseType:'text'});
  }
}
