export class MenusM {

    id: number;
    nomMenuFR: string;
    nomMenuEN: string;
    position: string;



    constructor(id: number=null, nomMenuFR: string = null, nomMenuEN: string = null, position: string = null) {
        this.id = id;
        this.nomMenuFR = nomMenuFR;
        this.nomMenuEN = nomMenuEN;
        this.position = position;

    }
}