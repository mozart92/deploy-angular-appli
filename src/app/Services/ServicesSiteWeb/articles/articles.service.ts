import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_USE} from '../../../ServiceAPI/GeneralAPI';


@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  public  host:string= API_USE;

  constructor(private http:HttpClient) { }

  public getArticles(){
    return this.http.get(this.host+"/articles");
  }

  saveArticle(dataForm) {
    return this.http.post(this.host+"/save/article", dataForm);
  }

  updateArticle(dataForm: any) {
    return this.http.put(`${this.host}/update/article`, dataForm);
  }

  deleteArticle(id: number) {
    return this.http.delete(`${this.host}/supprime/article/${id}`, {responseType:'text'});
  }
}
