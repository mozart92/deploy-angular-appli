export class MultimediaM {

    id: number;
    titreFR: string;
    titreEN: string;
    descriptionFR: string;
    descriptionEN: string;
    fichierUploader: string;
    create_by: string;
    typeMedia: string;
    update_by: string;


    constructor(id: number = null,
                titreFR: string = null,
                titreEN: string = null,
                descriptionFR: string = null, descriptionEN: string = null,
                fichierUploader: string = null,
                create_by: string =null,
                typeMedia: string = null,
                update_by: string = null) {

        this.id = id;
        this.titreFR = titreFR;
        this.titreEN = titreEN;
        this.descriptionFR = descriptionFR;
        this.descriptionEN = descriptionEN;
        this.fichierUploader = fichierUploader;
        this.create_by = create_by;
        this.typeMedia = typeMedia;
        this.update_by = update_by;

    }
}