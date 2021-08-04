import {Group} from './group';
import {ThemesUsersM} from './ThemesUsersM';

export class Utilisateurs {


  id: number;
  nomPrenom: String;
  tel: String;
  email: String;
  sexe: String;
  identifiant: String;
  password: String;
  actif: String;
  appartenanceGroup: Group[];
  funcHierachique: String;
  suppHierachique:String;
  groupes: Group[];
  regionUser: string;
  departementUser:string;
  communeUser:string;
  czvUser:string;
  themesUsers : ThemesUsersM;

  constructor(id=null,
              nomPrenom=null,
              tel=null,
              email=null,
              sexe=null,
              identifiant=null,
              password=null,
              actif=null,
              funcHierachique=null,
              suppHierachique=null,
              appartenanceGroup=[],
              regionUser?,
              departementUser?,
              communeUser?,
              czvUser?
  )
  {
    this.id=id;

    if (nomPrenom==""){
      this.nomPrenom=null;
    }else {
      this.nomPrenom=nomPrenom;
    }

    if (tel==""){
      this.tel=null;
    }else {
      this.tel=tel;
    }

    if (email==""){
      this.email=null;
    }else {
      this.email=email;
    }

    if (sexe==""){
      this.sexe=null;
    }else {
      this.sexe=sexe;
    }

    if (identifiant==""){
      this.identifiant=null;
    }else {
      this.identifiant=identifiant;
    }


    if (password==""){
      this.password=null;
    }else {
      this.password = password;
    }

    if (actif==""){
      this.actif=null;
    }else {
      this.actif=actif;
    }

    this.appartenanceGroup=appartenanceGroup;
    if (suppHierachique==""){
      this.suppHierachique=null;
    }else {
      this.suppHierachique=suppHierachique;
    }

    if (funcHierachique==""){
      this.funcHierachique=null;
    }else {
      this.funcHierachique=funcHierachique;
    }

    if (regionUser==""){
      this.regionUser = null;
    }else {
      this.regionUser = regionUser;
    }

    if (departementUser==""){
      this.departementUser = null;
    }else {
      this.departementUser = departementUser;
    }

    if (communeUser==""){
      this.communeUser = null;
    }else{
      this.communeUser = communeUser;
    }

    if (czvUser==""){
      this.czvUser = null;
    }else{
      this.czvUser = czvUser;
    }

  }


}
