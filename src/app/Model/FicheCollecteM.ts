import {BaseQuestionnaireM} from './BaseQuestionnaireM';
import {ElementsFicheM} from './ElementsFicheM';


export class FicheCollecteM {

    id:number;
    nomFiche: string;
    lienMenu: string;
    description: string;
    nomFicheEN: string;
    lienMenuEN: string;
    descriptionEN: string;
    baseQuestionnaireID:any;
    elementsFiches: Array<ElementsFicheM>;
    baseQuestionnaire: BaseQuestionnaireM;
    elementStatDefault:any;


    constructor(id=null,
                nomFiche = '',
                lienMenu = '',
                description = '',
                baseQuestionnaireID = null,
                elementsFiches = null,
                baseQuestionnaire=null,
                elementStatDefault?,
                nomFicheEN = '',
                lienMenuEN = '',
                descriptionEN = '') {
        this.id = id;
        this.nomFiche = nomFiche;
        this.lienMenu = lienMenu;
        this.description = description;
        this.nomFicheEN = nomFicheEN;
        this.lienMenuEN = lienMenuEN;
        this.descriptionEN = descriptionEN;
        this.baseQuestionnaireID = baseQuestionnaireID;
        this.elementsFiches = elementsFiches;
        this.baseQuestionnaire = baseQuestionnaire;

        if (elementStatDefault == true){
            this.elementStatDefault = id;
        }else {
            this.elementStatDefault = null
        }

    }
}

