import { Injectable } from '@angular/core';
import {API_USE} from '../../ServiceAPI/GeneralAPI';
import {HttpClient} from '@angular/common/http';
import {CzvsModel} from '../../Model/CzvsModel';
import {VillagesM} from '../../Model/VillagesM';

@Injectable({
  providedIn: 'root'
})
export class CzvsService {

  public  host:string= API_USE;

  constructor(private http:HttpClient) { }

  public getCZVS(){
    return this.http.get(this.host+"/CZVS");
  }

  saveCZVS(dataForm : CzvsModel) {
    return this.http.post(this.host+"/sauvegarder-CZVS", dataForm);
  }

  updateCZVS(dataForm: CzvsModel) {
    return this.http.put(`${this.host}/CZVS`, dataForm);
  }

  deleteCZVS(id: number) {
    return this.http.delete(`${this.host}/CZVS/${id}`, {responseType:'text'});
  }


}
