import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_USE} from '../../ServiceAPI/GeneralAPI';
import {AnwserQuestions, DatasOntraetments, ImagesAttachees} from '../../Model/anwserQuestions';
import {Observable} from 'rxjs';
import {Utilisateurs} from '../../Model/utilisateurs';


export interface TypeAllMyDatas {
  anwserQuestions : AnwserQuestions;
  nameProgrammationFR : string;
  nameProgrammationEN : string;
}


@Injectable({
  providedIn: 'root'
})
export class AnwserQuestionsService {

  public host: string = API_USE;

  NOTIFICATION_DATA_REMPLIS = 0;
  NOTIFICATION_DATA_RECUS = 0;
  NOTIFICATION_DATA_DEJA_SEND = 0;
  NOTIFICATION_ALL_MY_DATAS = 0;

  constructor(private http: HttpClient) {
    this.nbreNotificationDonneRempli();
    this.nbreNotificationDonneRecu();
    this.nbreNotificationDonneDajeEnvoyer();
    this.nbreNotificationAllMyDatas();
  }

  public getAnwserQuestion() {
    return this.http.get(this.host + "/AnwserQuestion");
  }

  public getAllDataNoReadByUsers() {
    return this.http.get(this.host + "/donnees/user/non/lu/" + localStorage.getItem("token"));
  }

  public getAllDatasReceive() {
    return this.http.get(this.host + "/donnees/user/recue/" + localStorage.getItem("token"));
  }

  public getAllAnwserQuestionsofFileByDefault() {
    return this.http.get(this.host + "/donneeStat/default");
  }

  public getDonneeDejaValidees() {

    return this.http.get(this.host + "/donnees-deja-validees");
  }


  public getDataNoSendUser(data) {
    return this.http.post(this.host + "/datas/send/" + localStorage.getItem("token"), data);
  }


  saveAnwserQuestion(dataForm) {
    return this.http.post(this.host + "/saveReponse", dataForm);
  }

  forwardData(dataForm) {
    return this.http.post(this.host + "/renvoiData", dataForm);
  }

  getAnwserQuestionID(id) {
    return this.http.get(this.host + "/All-AnwserQuestions", id);
  }


  updateAnwserQuestion(dataForm: AnwserQuestions) {
    return this.http.put(`${this.host}/update-AnwserQuestions`, dataForm);
  }

  deleteAnwserQuestion(id: number) {
    return this.http.delete(`${this.host}/delete-reponse-questions/${id}`);
  }

  nbreNotificationDonneRempli() {
    this.getAllDataNoReadByUsers().subscribe(
      (response) => {
        this.NOTIFICATION_DATA_REMPLIS = (response as AnwserQuestions[]).length;
      },
      (error) => {

      }
    )
  }

  nbreNotificationDonneRecu() {
    this.getAllDatasReceive().subscribe(
      (response) => {
        this.NOTIFICATION_DATA_RECUS = (response as AnwserQuestions[]).length;
      },
      (error) => {

      }
    )
  }

  nbreNotificationDonneDajeEnvoyer() {
    this.getDonneeDejaValidees().subscribe(
      (response) => {
        this.NOTIFICATION_DATA_DEJA_SEND = (response as AnwserQuestions[]).length;
      },
      (error) => {

      }
    )
  }

  nbreNotificationAllMyDatas() {
    this.getAllMyDatas().subscribe(
      (response) => {
        this.NOTIFICATION_ALL_MY_DATAS = response.length;
      }
    )
  }

  getHistoriqueDonneeChannel(): Observable<Utilisateurs[]> {
    return this.http.get<Utilisateurs[]>(`${this.host}/historique-donnee`);
  }

  getAllMyDatas(): Observable<TypeAllMyDatas[]> {
    return this.http.get<TypeAllMyDatas[]>(`${this.host}/allMyDatas`);
  }

  public getAllImagesAttachees(id): Observable<ImagesAttachees[]> {
    return this.http.get<ImagesAttachees[]>(`${this.host}/images/${id}`);
  }

}
