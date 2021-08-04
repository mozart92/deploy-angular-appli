import {BaseQuestionnaireM} from './BaseQuestionnaireM';

export class NewPlanification {
  id: number;
  libellePlanning: String;
  libellePlanningEN: String;
  dateDebut: Date;
  dateFin: Date;
  dateFinInitiale: Date;
  frequence: String;
  dateEffictif: Date;
  typeCloture: String;
  observations: String;
  observationsEN: String;
  objectif: String;
  objectifEN: String;
  commentaireBulletin: String;
  collectBaseQuestionnaire: any;
  baseQuestionnaires: BaseQuestionnaireM[];
  programmerPar: String;
  etatStartFill : boolean = false;
  tempRestant = null;
  idOrigin: number;

  constructor(id=null,
              libellePlanning=null,
              dateDebut=null,
              dateFin=null,
              frequence=null,
              dateEffictif=null,
              typeCloture=null,
              observations=null,
              collectBaseQuestionnaire=null,
              baseQuestionnaires=null,
              objectif=null,
              programmerPar?:String,
              dateFinInitiale?,
              idOrigin?,
              libellePlanningEN=null,
              observationsEN=null,
              objectifEN=null,
              commentaireBulletin=null) {

    this.id=id;
    this.libellePlanning=libellePlanning;
    this.libellePlanningEN=libellePlanningEN;
    this.dateDebut=dateDebut;
    this.dateFin=dateFin;
    this.frequence=frequence;
    this.dateEffictif= dateEffictif;
    this.typeCloture=typeCloture;
    this.observations=observations;
    this.observationsEN=observationsEN;
    this.collectBaseQuestionnaire=collectBaseQuestionnaire;
    this.baseQuestionnaires=baseQuestionnaires;
    this.objectif = objectif;
    this.objectifEN = objectifEN;
    this.programmerPar = programmerPar;
    this.dateFinInitiale = dateFinInitiale;
    this.idOrigin = idOrigin;
    this.commentaireBulletin = commentaireBulletin;

    this.isDateBegin();
  }

  isDateBegin(){
    if (this.dateEffictif!=null){

      let currentDate: Date = new Date(this.dateEffictif.toString());
      let differrenceDate = new Date().getTime() - currentDate.getTime();

      if (differrenceDate>0){
        this.etatStartFill = true;
      }

      let dateCal: Date = new Date();
      dateCal.setTime(differrenceDate);
      this.tempRestant = dateCal.getDay();

    }
  }
}
