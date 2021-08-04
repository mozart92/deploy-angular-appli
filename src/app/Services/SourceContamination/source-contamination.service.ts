import { Injectable } from '@angular/core';
import {API_USE} from '../../ServiceAPI/GeneralAPI';
import {HttpClient} from '@angular/common/http';
import {SourceContaminationM} from '../../Model/SourceContaminationM';

@Injectable({
  providedIn: 'root'
})
export class SourceContaminationService {

  public  host:string= API_USE;

  constructor(private http:HttpClient) { }

  public getSourceContamination(){
    return this.http.get(this.host+"/sourceContamination");
  }

  saveSourceContamination(dataForm : SourceContaminationM) {
    return this.http.post(this.host+"/sauvegarder-sourceContamination", dataForm);
  }

  updateSourceContamination(dataForm: SourceContaminationM) {
    return this.http.put(`${this.host}/sourceContamination`, dataForm);
  }

  deleteSourceContamination(id: number) {
    return this.http.delete(`${this.host}/sourceContamination/${id}`, {responseType:'text'});
  }
}
