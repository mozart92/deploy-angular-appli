import { Injectable } from '@angular/core';
import {API_USE} from '../../ServiceAPI/GeneralAPI';
import {HttpClient} from '@angular/common/http';
import {TypeVaccinM} from '../../Model/TypeVaccinM';

@Injectable({
  providedIn: 'root'
})
export class TypeVaccinService {

  public  host:string= API_USE;

  constructor(private http:HttpClient) { }

  public getTypeVaccin(){
    return this.http.get(this.host+"/typeVaccin");
  }

  saveTypeVaccin(dataForm : TypeVaccinM) {
    return this.http.post(this.host+"/sauvegarder-typeVaccin", dataForm);
  }

  updateTypeVaccin(dataForm: TypeVaccinM) {
    return this.http.put(`${this.host}/typeVaccin`, dataForm);
  }

  deleteTypeVaccin(id: number) {
    return this.http.delete(`${this.host}/typeVaccin/${id}`, {responseType:'text'});
  }
}
