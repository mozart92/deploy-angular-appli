import { Injectable } from '@angular/core';
import {API_USE} from '../../ServiceAPI/GeneralAPI';
import {HttpClient} from '@angular/common/http';
import {MaladiesM} from '../../Model/MaladiesM';

@Injectable({
  providedIn: 'root'
})
export class MaladiesService {


  public  host:string= API_USE;

  constructor(private http:HttpClient) { }

  public getMaladie(){
    return this.http.get(this.host+"/maladies");
  }

  saveMaladie(dataForm : MaladiesM) {
    return this.http.post(this.host+"/sauvegarder-maladies", dataForm);
  }

  updateMaladie(dataForm: MaladiesM) {
    return this.http.put(`${this.host}/maladies`, dataForm);
  }

  deleteMaladie(id: number) {
    return this.http.delete(`${this.host}/maladies/${id}`, {responseType:'text'});
  }


}
