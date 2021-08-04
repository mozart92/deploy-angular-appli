import {Utilisateurs} from './utilisateurs';
import {FicheCollecteM} from './FicheCollecteM';


export interface DatasOntraetments {
   id : number;
   nomExpetiteur : string;
   niveauExpetiteur : number;
   nomDestinateur : string;
   niveauDestinateur : number;
   dateSoumission : Date;
   anwserQuestions : AnwserQuestions;
}

export interface ImagesAttachees {
  id : number;
  nameImage : string;
  idAnwserQuestions : number;
}



export class AnwserQuestions {

  id:number;
  reponseJson: String;
  nameuser: String;
  nameFile: number;
  create_le: Date;
  update_by: Utilisateurs;
  create_by: Utilisateurs;
  ficheCollecte: FicheCollecteM;
  update_le: Date;
  userNiveauValidation: Utilisateurs;
  utilisateursCreate: Utilisateurs;
  programmation: any;
  nbreCommentaire : number = 0;




  constructor(id=null, reponseJson=null, nameuser=null, nameFile=null, programmation?) {
    this.id=id;
    this.reponseJson=reponseJson;
    this.nameuser=nameuser;
    this.nameFile=nameFile;
    this.programmation =  programmation;
  }
}
