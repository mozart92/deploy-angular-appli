import {NewPlanification} from './NewPlanification';

export class LogPlanning {

     programmation:NewPlanification;
     dataValide:any;
     dataEncour:any;
     dataSend:any;


    constructor(programmation: NewPlanification, dataValide: any, dataEncour: any, dataSend: any) {
        this.programmation = programmation;
        this.dataValide = dataValide;
        this.dataEncour = dataEncour;
        this.dataSend = dataSend;
    }
}
