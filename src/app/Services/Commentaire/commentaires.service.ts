import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_USE} from '../../ServiceAPI/GeneralAPI';
import {CommentairesM} from '../../Model/CommentairesM';
import {Observable} from 'rxjs';
import {AnwserQuestions} from '../../Model/anwserQuestions';

@Injectable({
  providedIn: 'root'
})
export class CommentairesService {

  private link : String = API_USE;

  constructor(private http: HttpClient) { }

  public sendCommentaires(commentaireData : CommentairesM){
    return this.http.post(this.link+"/commentaire", commentaireData);
  }

  public getAllCommentaireByData(infoData: number | AnwserQuestions){
    return this.http.get(this.link+"/data/Commentaires/"+infoData);
  }


}
