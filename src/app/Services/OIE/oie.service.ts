import { Injectable } from '@angular/core';
import {API_USE} from '../../ServiceAPI/GeneralAPI';
import {HttpClient} from '@angular/common/http';
import {OIEM} from '../../Model/OIEM';


@Injectable({
  providedIn: 'root'
})
export class OIEService {

  public  host:string= API_USE;

  constructor(private http:HttpClient) { }

  public getOIE(){
    return this.http.get(this.host+"/OIE");
  }

  saveOIE(dataForm : OIEM) {
    return this.http.post(this.host+"/sauvegarder-OIE", dataForm);
  }

  updateOIE(dataForm: OIEM) {
    return this.http.put(`${this.host}/OIE`, dataForm);
  }

  deleteOIE(id: number) {
    return this.http.delete(`${this.host}/OIE/${id}`, {responseType:'text'});
  }
}
