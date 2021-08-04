import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_USE} from '../../ServiceAPI/GeneralAPI';


@Injectable({
    providedIn: 'root'
})
export class CommuneService {

    public  host:string= API_USE;

    constructor(private http:HttpClient) { }

    public getCommunes(){
        return this.http.get(this.host+"/communes");
    }

    saveCommune(dataForm) {
        return this.http.post(this.host+"/sauvegarder-communes", dataForm);
    }

    updateCommune(id:number, dataForm: any) {

        return this.http.put(`${this.host}/communes/${id}`, dataForm);
    }

    deleteCommune(id: number) {
        return this.http.delete(`${this.host}/communes/${id}`, {responseType:'text'});
    }
}
