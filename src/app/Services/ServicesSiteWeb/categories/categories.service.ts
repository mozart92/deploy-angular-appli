import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_USE} from '../../../ServiceAPI/GeneralAPI';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  public  host:string= API_USE;

  constructor(private http:HttpClient) { }

  public getCategories(){
    return this.http.get(this.host+"/categories");
  }

  saveCategories(dataForm) {
    return this.http.post(this.host+"/save/categories", dataForm);
  }

  /*getAllCommuneByIdCategories(idCategories) {
    return this.http.get(this.host+"/categories/"+idCategories);
  }*/


  updateCategories(dataForm: any) {
    return this.http.put(`${this.host}/updateCategories`, dataForm);
  }

  deleteCategories(id: number) {
    return this.http.delete(`${this.host}/delele/categories/${id}`, {responseType:'text'});
  }


}
