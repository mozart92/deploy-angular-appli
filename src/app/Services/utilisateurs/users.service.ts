import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_USE} from '../../ServiceAPI/GeneralAPI';
import {Utilisateurs} from '../../Model/utilisateurs';



@Injectable({
  providedIn: 'root'
})
export class UsersService {

  link:String = API_USE;

  constructor(private http: HttpClient) { }

  addUser(user: Utilisateurs){
    return  this.http.post(this.link+"/addUser" , user);
  }

  updateUser(user: Utilisateurs){
    return this.http.put(this.link+"/updateUser" , user)
  }

  deleteUser(idUser: number){
    return  this.http.delete(this.link+"/deleleUser/"+idUser);
  }

  getAllUsers(){
    return  this.http.get(this.link+"/Users");
  }

  getOneUser(user : Utilisateurs){
    return  this.http.post(this.link+"/authentification", user);
  }

  findUserByNameFonction(nameFonction: String){
    return  this.http.get(this.link+"/existeFonction/"+nameFonction);
  }

  updateProfilUser(user: Utilisateurs){
    return this.http.put(this.link+"/utilisateur/updateUser" , user)
  }

  getUtilisateurByEmail(){
    return  this.http.get(this.link+"/utilisateur/connect");
  }

}
