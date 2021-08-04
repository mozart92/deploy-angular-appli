import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Utilisateurs} from '../../Model/utilisateurs';
import {NewPlanification} from '../../Model/NewPlanification';
import {Group} from '../../Model/group';
import {API_USE} from '../../ServiceAPI/GeneralAPI';
import {NiveauValidationM} from '../../Model/NiveauValidationM';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewPlannificationService {


  link:String = API_USE;

  constructor(private http: HttpClient) { }

  addPlannification(plannification: NewPlanification){
    return  this.http.post(this.link+"/ajout-plannification" , plannification);
  }

  updatePlannification(plannification: NewPlanification){
    return this.http.put(this.link+"/update-plannification" , plannification)
  }

  prolongeDateFinPlanningAcherve(plannification: NewPlanification){
    return this.http.put(this.link+"/update-dateFin/planning" , plannification)
  }


  desactivatedGroupAttribut(groupe: NiveauValidationM){
    return this.http.put(this.link+"/groupe/desactive/validation" , groupe);
  }



  updatePlannificationForQuestionnaire(plannification){
    return this.http.post(this.link+"/update-plannification-Questionnaire" , plannification)
  }


  deletePlannification(idplanning: number){
    return  this.http.delete(this.link+"/delete-programmations/"+idplanning);
  }

  getAllplannifications(){
    return  this.http.get(this.link+"/plannifications");
  }

  getAllPlanningArchive(){
    return  this.http.get(this.link+"/allPlanning/archive");
  }


  getAllPlanningUser(){
    return  this.http.get(this.link+"/plannifications/access/"+localStorage.getItem("token"));
  }

  getAllPlanningArchiveUser(){
    return  this.http.get(this.link+"/plannificationsArchive/access/");
  }

  getAllGrroupAssignValided(idPlanning){
    return  this.http.get(this.link+"/group/assign/validation/"+idPlanning);
  }

  getAllGrroupAssignValidedPlanningArchive(idPlanning){
    return  this.http.get(this.link+"/group/assign/validation/planning/archive/"+idPlanning);
  }


  getPlanningExpirer(){
    return  this.http.get(this.link+"/notification/planning");
  }


  SendAllNiveauPlanning(infoValidation){
    return  this.http.post(this.link+"/save-configvalidation", infoValidation);
  }

  archivePlanning(data:NewPlanification){
    return this.http.post(this.link+"/planning/archive", data);
  }

  getPlanningArchiverByIdPlanning(idPlanning):Observable<NewPlanification>{
   return this.http.get<NewPlanification>(this.link+"/planning/getByid/"+idPlanning);
  }

  saveCommentaireBulletin(plannification: NewPlanification){
    return  this.http.post(this.link+"/saveCommentairebulletin" , plannification);
  }


}
