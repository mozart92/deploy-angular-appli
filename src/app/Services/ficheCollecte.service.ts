import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FicheCollecteM} from '../Model/FicheCollecteM';
import {API_USE} from '../ServiceAPI/GeneralAPI';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FicheCollecteServicee {

    public  host:string= API_USE;

    constructor(private http:HttpClient) { }

    public getFicheCollectes(){
        return this.http.get(this.host+"/fichecollectes");
    }

    public defineElementStat(idFiche){
        return this.http.get(this.host+"/config/elementStat/"+idFiche);
    }

    saveFicheCollecte(dataForm) {
        console.log(dataForm);
        return this.http.post(this.host+"/saveFiche", dataForm);
    }

    getFicheCollecteBaseQuestionnaire(id) {
        return this.http.get(this.host+"/file-by-baseQuestionnaire/"+id);
    }


    updateFicheCollecte(dataForm: FicheCollecteM) {
        return this.http.put(`${this.host}/updateFiche`, dataForm);
    }

    deleteFicheCollecte(id: number) {
        return this.http.delete(`${this.host}/fichecollectes/${id}`);
    }

  duplicateFicheService(id:number):Observable<FicheCollecteM>{
    return this.http.get<FicheCollecteM>(this.host+"/fiche/duplication/"+id);
  }
}
