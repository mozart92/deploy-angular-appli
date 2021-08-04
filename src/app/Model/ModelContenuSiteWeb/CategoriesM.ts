export class CategoriesM {

    id: number;
    libelleCategoriesFR: string;
    libelleCategoriesEN: string;
    create_by: string;
    update_by: string;
    groupeParent: number;
    parentMenu: CategoriesM;


    constructor(id: number=null,
                libelleCategoriesFR: string = null,
                libelleCategoriesEN: string = null,
                create_by: string = null,
                update_by: string = null,
                groupeParent: number= null) {

        this.id = id;
        this.libelleCategoriesFR = libelleCategoriesFR;
        this.libelleCategoriesEN = libelleCategoriesEN;
        this.create_by = create_by;
        this.update_by = update_by;
        this.groupeParent = groupeParent;

    }
}