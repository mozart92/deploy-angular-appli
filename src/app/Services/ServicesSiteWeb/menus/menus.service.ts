import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MenusM} from '../../../Model/ModelContenuSiteWeb/MenusM';
import {API_USE} from '../../../ServiceAPI/GeneralAPI';


@Injectable({
  providedIn: 'root'
})
export class MenusService {

  public  host:string= API_USE;

  constructor(private http:HttpClient) { }

  public getMenus(){
    return this.http.get(this.host+"/Menus");
  }

  saveMenu(dataForm) {
    console.log(dataForm);
    return this.http.post(this.host+"/saveMenu", dataForm);
  }

  /*getMenuBaseQuestionnaire(id) {
    return this.http.get(this.host+"/file-by-baseQuestionnaire/"+id);
  }*/


  updateMenu(dataForm: MenusM) {
    return this.http.put(`${this.host}/updateMenu`, dataForm);
  }

  deleteMenu(id: number) {
    return this.http.delete(`${this.host}/menu/${id}`);
  }
}
