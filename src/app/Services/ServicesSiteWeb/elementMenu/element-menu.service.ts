import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_USE} from '../../../ServiceAPI/GeneralAPI';

@Injectable({
  providedIn: 'root'
})
export class ElementMenuService {

  public  host:string= API_USE;

  constructor(private http:HttpClient) { }

  public getElementsMenus(idFiche){
    return this.http.get(this.host+"/element/menu/"+idFiche);
  }

  saveElementsMenu(dataForm) {
    return this.http.post(this.host+"/save/element/menu", dataForm);
  }

 /* getElementsMenuID(id) {
    return this.http.get(this.host+"/All-elements/"+id);
  }*/


  updateElementsMenu( dataForm: any) {
    return this.http.put(`${this.host}/update/element/menu`, dataForm);
  }

  deleteElementsMenu(valElement) {
    return this.http.post(`${this.host}/element/menu`, valElement);
  }
}
