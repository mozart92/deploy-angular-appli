import {Utilisateurs} from './utilisateurs';
import {AnwserQuestions} from './anwserQuestions';

export class CommentairesM {
  id : number;
  contenu : string;
  dateEnvoi : Date;
  dateUpdate : Date;
  initiateur : Utilisateurs;
  lu : boolean = false;
  dataConcernee: AnwserQuestions;
  dataConcerneeId : number;
  participants : Utilisateurs;
  participantEmail : string;

  constructor(id: number, contenu: string, dateEnvoi: Date, dateUpdate: Date, initiateur: Utilisateurs, lu: boolean, dataConcerneeId: number, participantEmail: string,participants? : Utilisateurs) {
    this.id = id;
    this.contenu = contenu;
    this.dateEnvoi = dateEnvoi;
    this.dateUpdate = dateUpdate;
    this.initiateur = initiateur;
    this.lu = lu;
    this.dataConcerneeId = dataConcerneeId;
    this.participantEmail = participantEmail;
    this.participants = participants;
  }

}
