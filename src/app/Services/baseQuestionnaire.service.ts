import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_USE} from '../ServiceAPI/GeneralAPI';

@Injectable({
    providedIn: 'root'
})
export class BaseQuestionnaireService {

    public  host:string= API_USE;

    constructor(private http:HttpClient) { }

    public getBaseQuestionnaires(){
        return this.http.get(this.host+"/basequestionnaires");
    }

    saveBaseQuestionnaire(dataForm) {
        return this.http.post(this.host+"/basequestionnaires", dataForm);
    }

    /*getBaseQuestionnaireID(id) {
        return this.http.get(this.host+"/basequestionnaires", id);
    }*/


    updateBaseQuestionnaire(id:number, dataForm: any) {
        return this.http.put(`${this.host}/basequestionnaires/${id}`, dataForm);
    }

    deleteBaseQuestionnaire(id: number) {
        return this.http.delete(`${this.host}/basequestionnaires/${id}`, {responseType:'text'});
    }
}
