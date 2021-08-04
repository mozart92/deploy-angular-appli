

export class BaseQuestionnaireM {

    id:number;
    nomBase: string;
    lienMenu: string;
    description: string;
    nomBaseEN: string;
    lienMenuEN: string;
    descriptionEN: string;
    statut:string;
    programmation:any;



    constructor(id=1,
                nomBase = '',
                lienMenu = '',
                description = '',
                statut = '',
                programmation = '' ,
                nomBaseEN = '',
                lienMenuEN = '',
                descriptionEN = '') {
        this.id = id;
        this.nomBase = nomBase;
        this.lienMenu = lienMenu;
        this.description = description;
        this.nomBaseEN = nomBaseEN;
        this.lienMenuEN = lienMenuEN;
        this.descriptionEN = descriptionEN;
        this.statut = statut;
        this.programmation = programmation;
    }
}

