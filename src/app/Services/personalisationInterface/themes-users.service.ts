import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_USE} from '../../ServiceAPI/GeneralAPI';
import {ThemesUsersM} from '../../Model/ThemesUsersM';

@Injectable({
  providedIn: 'root'
})
export class ThemesUsersService {

  link = API_USE;

  constructor(private http : HttpClient) { }

  personnalisationTheme(dataTheme : ThemesUsersM){
   return this.http.post(`${this.link}/sauvegade-themeUser`, dataTheme);
  }

}
