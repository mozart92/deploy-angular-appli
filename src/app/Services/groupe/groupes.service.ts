import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Group} from '../../Model/group';
import {Utilisateurs} from '../../Model/utilisateurs';
import {API_USE} from '../../ServiceAPI/GeneralAPI';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupesService {

  link:String = API_USE;
  listGroup: Array<Group> = [];
  groupe: Group;

  constructor(private http: HttpClient) { }

  addGroups(group: Group){
      return  this.http.post(this.link+"/addgroup" , group);
  }

  updateGroup(group: Group){
    return this.http.put(this.link+"/updateGroup" , group)
  }

  deleteGroup(idGroup: number){
    return  this.http.delete(this.link+"/deleleGroup/"+idGroup);
  }

  getAllGroup(){
    return  this.http.get(this.link+"/groupes");
  }

  getGroupFunction(){
    return  this.http.get(this.link+"/group/type/function");
  }




  getAllGrroupsForService():Observable<Group[]>{
   return  this.http.get<Group[]>(this.link+"/groupes");
  }



  getAllGroupWithformatage():Array<Group>{
    const donneeGroup: Array<Group> = [];
      this.http.get(this.link+"/group/type/function").subscribe(
        (response)=>{
          const tailleArray = (<Utilisateurs[]>response).length;
          for (let i=0; i<tailleArray;i++){
            this.groupe = new Group(
                response[i].id,
                response[i].libelleGroupe,
                response[i].abreviation,
                response[i].description,
                response[i].groupesLie,
                response[i].typeGroupes
            );
            donneeGroup.push(this.groupe)
          }

        } ,
        (error)=>{

        }
    );

    return donneeGroup;

  }





}


