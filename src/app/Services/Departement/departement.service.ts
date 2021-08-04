import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_USE} from '../../ServiceAPI/GeneralAPI';


@Injectable({
  providedIn: 'root'
})
export class DepartementService {

  public host: string = API_USE;

  constructor(private http: HttpClient) {
  }

  public getDepartements() {
    return this.http.get(this.host + '/departements');
  }

  saveDepartement(dataForm) {
    return this.http.post(this.host + '/departements', dataForm);
  }

  getAllCommuneByIdDepartement(idDepartement) {
    return this.http.get(this.host + '/regroup-communes/' + idDepartement);
  }


  updateDepartement(id: number, dataForm: any) {
    return this.http.put(`${this.host}/departements/${id}`, dataForm);
  }

  deleteDepartement(id: number) {
    return this.http.delete(`${this.host}/departements/${id}`, {responseType: 'text'});
  }
}
