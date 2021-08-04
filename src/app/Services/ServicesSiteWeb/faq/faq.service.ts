import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_USE} from '../../../ServiceAPI/GeneralAPI';

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  public  host:string= API_USE;

  constructor(private http:HttpClient) { }

  public getFaq(){
    return this.http.get(this.host+"/faq");
  }

  saveFaq(dataForm) {
    return this.http.post(this.host+"/faq", dataForm);
  }

  getAllDepartementByIdFaq(idFaq) {
    return this.http.get(this.host+"/faq/"+idFaq);
  }


  updateFaq(dataForm: any) {
    return this.http.put(`${this.host}/faq/update`, dataForm);
  }

  deleteFaq(id: number) {
    return this.http.delete(`${this.host}/faq/supprime/${id}`, {responseType:'text'});
  }
}
