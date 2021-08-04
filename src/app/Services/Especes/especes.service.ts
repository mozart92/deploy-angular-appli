import { Injectable } from '@angular/core';
import {API_USE} from '../../ServiceAPI/GeneralAPI';
import {HttpClient} from '@angular/common/http';
import {EspecesM} from '../../Model/EspecesM';


@Injectable({
  providedIn: 'root'
})
export class EspecesService {

  public  host:string= API_USE;

  constructor(private http:HttpClient) { }

  public getEspece(){
    return this.http.get(this.host+"/especes");
  }

  saveEspece(dataForm : EspecesM ) {
    return this.http.post(this.host+"/sauvegarder-especes", dataForm);
  }

  updateEspece(dataForm : EspecesM) {
    return this.http.put(`${this.host}/especes`, dataForm);
  }

  deleteEspece(id: number) {
    return this.http.delete(`${this.host}/especes/${id}`, {responseType:'text'});
  }
}
