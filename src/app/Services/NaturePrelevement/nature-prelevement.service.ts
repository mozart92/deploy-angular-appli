import { Injectable } from '@angular/core';
import {API_USE} from '../../ServiceAPI/GeneralAPI';
import {HttpClient} from '@angular/common/http';
import {NaturePrelevementM} from '../../Model/NaturePrelevementM';


@Injectable({
  providedIn: 'root'
})
export class NaturePrelevementService {

  public  host:string= API_USE;

  constructor(private http:HttpClient) { }

  public getNaturePrelevement(){
    return this.http.get(this.host+"/naturePrelevement");
  }

  saveNaturePrelevement(dataForm : NaturePrelevementM) {
    return this.http.post(this.host+"/sauvegarder-naturePrelevement", dataForm);
  }

  updateNaturePrelevement(dataForm: NaturePrelevementM) {
    return this.http.put(`${this.host}/naturePrelevement`, dataForm);
  }

  deleteNaturePrelevement(id: number) {
    return this.http.delete(`${this.host}/naturePrelevement/${id}`, {responseType:'text'});
  }


}
