export class FaqM {

    id: number;
    questionFR: string;
    questionEN: string;
    reponseFR: string;
    reponseEN: string;
    create_by: string;
    update_by: string;


    constructor(id: number = null,
                questionFR: string = null,
                questionEN: string = null,
                reponseFR: string = null,
                reponseEN: string = null,
                create_by: string = null,
                update_by: string = null) {

        this.id = id;
        this.questionFR = questionFR;
        this.questionEN = questionEN;
        this.reponseFR = reponseFR;
        this.reponseEN = reponseEN;
        this.create_by = create_by;
        this.update_by = update_by;

    }
}