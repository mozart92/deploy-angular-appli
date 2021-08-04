import { Injectable } from '@angular/core';
import {API_USE} from '../../ServiceAPI/GeneralAPI';
import {HttpClient} from '@angular/common/http';
import {TypeProductionM} from '../../Model/TypeProductionM';

@Injectable({
  providedIn: 'root'
})
export class TypeProductionService {

  public  host:string= API_USE;

  constructor(private http:HttpClient) { }

  public getTypeProduction(){
    return this.http.get(this.host+"/typeProduction");
  }

  saveTypeProduction(dataForm : TypeProductionM) {
    return this.http.post(this.host+"/sauvegarder-typeProduction", dataForm);
  }

  updateTypeProduction(dataForm: TypeProductionM) {
    return this.http.put(`${this.host}/typeProduction`, dataForm);
  }

  deleteTypeProduction(id: number) {
    return this.http.delete(`${this.host}/typeProduction/${id}`, {responseType:'text'});
  }
}
