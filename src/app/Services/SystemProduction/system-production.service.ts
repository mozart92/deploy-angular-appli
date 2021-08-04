import { Injectable } from '@angular/core';
import {API_USE} from '../../ServiceAPI/GeneralAPI';
import {HttpClient} from '@angular/common/http';
import {SystemProductionM} from '../../Model/SystemProductionM';

@Injectable({
  providedIn: 'root'
})
export class SystemProductionService {

  public  host:string= API_USE;

  constructor(private http:HttpClient) { }

  public getSystemProduction(){
    return this.http.get(this.host+"/systemProduction");
  }

  saveSystemProduction(dataForm : SystemProductionM) {
    return this.http.post(this.host+"/sauvegarder-systemProduction", dataForm);
  }

  updateSystemProduction(dataForm: SystemProductionM) {
    return this.http.put(`${this.host}/systemProduction`, dataForm);
  }

  deleteSystemProduction(id: number) {
    return this.http.delete(`${this.host}/systemProduction/${id}`, {responseType:'text'});
  }

}
