import {MenusM} from './MenusM';

export class ElementsMenu {

    id: number;
    titreMenuFR: string;
    titreMenuEN: string;
    alias: string;
    typeMenu: string;
    propriete: string;
    parent: string;
    idMenu: number;
    menu: MenusM;


    constructor(id: number = null,
                titreMenuFR: string = null,
                titreMenuEN: string = null,
                alias: string = null,
                typeMenu: string = null,
                propriete: string = null,
                parent: string = null,
                idMenu: number = null,
                menu?:MenusM) {

        this.id = id;
        this.titreMenuFR = titreMenuFR;
        this.titreMenuEN = titreMenuEN;
        this.alias = alias;
        this.typeMenu = typeMenu;
        this.propriete = propriete;

        this.parent = parent;
        this.idMenu = idMenu;
        this.menu = menu;
    }
}