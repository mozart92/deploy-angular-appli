import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Group} from '../../Model/group';
import {API_USE} from '../../ServiceAPI/GeneralAPI';

@Injectable({
  providedIn: 'root'
})
export class ProfilGroupService {

  link: String = API_USE;

  constructor(private http: HttpClient) { }

  createPageForAccess(dataModulPage){
    return this.http.post(this.link+"/save/profils/groupe", dataModulPage);
  }

  getAllProfil(){
    return  this.http.get(this.link+"/groupes/profils");
  }

  assignePrivilegeToGroup(allvalue){
    return  this.http.put(this.link+"/assigne/privilege", allvalue);
  }


  deleteModulPage(allvalue){
    return  this.http.put(this.link+"/module/pages/supprimer", allvalue);
  }


  getProfilByIdGroup(idGroup){
    return this.http.get(this.link+"/groupe/privilege/"+idGroup);
  }

  getProfilUtilisateur(groupes: Group[]){
    return this.http.post(this.link+"/profils/utilisateur", groupes);
  }






}
