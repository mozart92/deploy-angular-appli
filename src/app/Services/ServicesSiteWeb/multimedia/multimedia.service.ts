import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_USE} from '../../../ServiceAPI/GeneralAPI';
import {MultimediaM} from '../../../Model/ModelContenuSiteWeb/MultimediaM';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {

  link:String = API_USE;

  constructor(private http: HttpClient) { }

  addMedia(media: MultimediaM){
    //console.log(Media)
    return  this.http.post(this.link+"/addMedia" , media);
  }

  updateMedia(media: MultimediaM){
    //console.log("valeur qui est envoye :",Media);
    return this.http.put(this.link+"/updateMedia" , media)
  }

  deleteMedia(idMedia: number){
    return  this.http.delete(this.link+"/deleleMedia/"+idMedia);
  }

  getAllMedia(){
    return  this.http.get(this.link+"/medias");
  }

}
