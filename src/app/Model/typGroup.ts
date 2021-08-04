import {Group} from './group';

export class TypGroup {
    private  libelleFR: String;
    private  libelleEN: String;
    private groupe: Group;

    constructor(libelleFR='',libelleEN='',groupe= new Group()) {
        this.libelleFR = libelleFR;
        this.libelleEN = libelleEN;
        this.groupe = groupe;
    }
}