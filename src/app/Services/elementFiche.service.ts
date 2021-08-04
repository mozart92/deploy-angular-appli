import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_USE} from '../ServiceAPI/GeneralAPI';
import {TypeInfoLegendeConfigAfficgeByFile} from '../Pages/visualisationDesDonnees/general-view/general-view.component';

@Injectable({
  providedIn: 'root'
})
export class ElementFicheService {

  public host: string = API_USE;

  constructor(private http: HttpClient) {
  }

  public getElementFiches(idFiche) {
    return this.http.get(this.host + '/elementsfiches/' + idFiche);
  }

  saveElementFiche(dataForm) {
    return this.http.post(this.host + '/elementsfiches', dataForm);
  }


  getElementFicheID(id) {
    return this.http.get(this.host + '/All-elements/' + id);
  }

  public defineBaseElementStatGeneral(idElement) {
    return this.http.get(this.host + '/config/baseElementStatGeneral/' + idElement);
  }

  updateElementFiche(dataForm: any) {
    return this.http.put(`${this.host}/update-elementFiche`, dataForm);
  }

  deleteElementFiche(valElement) {
    return this.http.post(`${this.host}/suppression-element`, valElement);
  }

  public allElementFicheDefault(){
    return this.http.get(this.host+"/allElement/fiche/default");
  }

  public saveElementForSiteWeb(elements : TypeInfoLegendeConfigAfficgeByFile[]){
    return  this.http.post(`${this.host}/indicicateur-for-site`, elements);
  }


}
