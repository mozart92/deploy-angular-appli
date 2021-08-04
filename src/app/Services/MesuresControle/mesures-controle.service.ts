import { Injectable } from '@angular/core';
import {API_USE} from '../../ServiceAPI/GeneralAPI';
import {HttpClient} from '@angular/common/http';
import {MesuresControleM} from '../../Model/MesuresControleM';

@Injectable({
  providedIn: 'root'
})
export class MesuresControleService {

  public  host:string= API_USE;

  constructor(private http:HttpClient) { }

  public getMesuresControle(){
    return this.http.get(this.host+"/mesuresControle");
  }

  saveMesuresControle(dataForm : MesuresControleM) {
    return this.http.post(this.host+"/sauvegarder-mesuresControle", dataForm);
  }

  updateMesuresControle(dataForm: MesuresControleM) {
    return this.http.put(`${this.host}/mesuresControle`, dataForm);
  }

  deleteMesuresControle(id: number) {
    return this.http.delete(`${this.host}/mesuresControle/${id}`, {responseType:'text'});
  }
}
