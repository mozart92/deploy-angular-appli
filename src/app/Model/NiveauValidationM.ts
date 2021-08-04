import {Group} from './group';
import {NewPlanification} from './NewPlanification';

export class NiveauValidationM {

  groupe: Group;
  niveau: number;
  programmation: NewPlanification;


  constructor(groupe: Group, niveau: number, programmation: NewPlanification) {
    this.groupe = groupe;
    this.niveau = niveau;
    this.programmation = programmation;
  }
}
