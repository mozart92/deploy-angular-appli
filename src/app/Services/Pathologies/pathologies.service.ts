import { Injectable } from '@angular/core';
import {API_USE} from '../../ServiceAPI/GeneralAPI';
import {HttpClient} from '@angular/common/http';
import {PathologiesM} from '../../Model/PathologiesM';


@Injectable({
  providedIn: 'root'
})
export class PathologiesService {

  public  host:string= API_USE;

  constructor(private http:HttpClient) { }

  public getPathologie(){
    return this.http.get(this.host+"/pathologies");
  }

  savePathologie(dataForm : PathologiesM) {
    return this.http.post(this.host+"/sauvegarder-pathologies", dataForm);
  }

  updatePathologie(dataForm: PathologiesM) {
    return this.http.put(`${this.host}/pathologies`, dataForm);
  }

  deletePathologie(id: number) {
    return this.http.delete(`${this.host}/pathologies/${id}`, {responseType:'text'});
  }

}
