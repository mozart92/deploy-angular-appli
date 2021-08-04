import {Injectable} from '@angular/core';
import {API_USE} from '../../ServiceAPI/GeneralAPI';
import {HttpClient} from '@angular/common/http';
import {LaboratoiresM} from '../../Model/LaboratoiresM';

@Injectable({
  providedIn: 'root'
})
export class LaboratoiresService {

  public host: string = API_USE;

  constructor(private http: HttpClient) {
  }

  public getLaboratoire() {
    return this.http.get(this.host + '/laboratoire');
  }

  saveLaboratoire(dataForm: LaboratoiresM) {
    return this.http.post(this.host + '/sauvegarder-laboratoire', dataForm);
  }

  updateLaboratoire(id, dataForm: LaboratoiresM) {
    return this.http.put(`${this.host}/laboratoire/${id}`, dataForm);
  }

  deleteLaboratoire(id: number) {
    return this.http.delete(`${this.host}/laboratoire/${id}`, {responseType: 'text'});
  }


}
