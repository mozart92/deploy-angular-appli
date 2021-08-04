import { Injectable } from '@angular/core';
import {API_USE} from '../../ServiceAPI/GeneralAPI';
import {HttpClient} from '@angular/common/http';
import {AnalyseLaboratoireM} from '../../Model/AnalyseLaboratoireM';

@Injectable({
  providedIn: 'root'
})
export class AnalyseLaboratoireService {

  public  host:string= API_USE;

  constructor(private http:HttpClient) { }

  public getAnalyseLaboratoire(){
    return this.http.get(this.host+"/analyseLaboratoire");
  }

  saveAnalyseLaboratoire(dataForm : AnalyseLaboratoireM) {
    return this.http.post(this.host+"/sauvegarder-analyseLaboratoire", dataForm);
  }

  updateAnalyseLaboratoire(dataForm: AnalyseLaboratoireM) {
    return this.http.put(`${this.host}/analyseLaboratoire`, dataForm);
  }

  deleteAnalyseLaboratoire(id: number) {
    return this.http.delete(`${this.host}/analyseLaboratoire/${id}`, {responseType:'text'});
  }

}
