import {CategoriesM} from './CategoriesM';
import {MultimediaM} from './MultimediaM';

export class ArticlesM {

    id: number;
    titreArticleFR: string;
    titreArticleEN: string;
    resumeArticleFR: string;
    resumeArticleEN: string;
    idCategorie: number;
    idMedia: number;
    textPrincipalFR: string;
    textPrincipalEN: string;
    create_by: string;
    create_le: string;
    update_by: string;
    categories: CategoriesM;
    media: MultimediaM;
    fichierUploader: string;

    constructor(id=null,
                titreArticleFR=null,
                titreArticleEN=null,
                resumeArticleFR=null,
                resumeArticleEN=null,
                idCategorie=null,
                idMedia=null,
                textPrincipalFR=null,
                textPrincipalEN=null,
                create_by=null,
                update_by = null,
                create_le=null) {
        this.id = id;
        this.titreArticleFR = titreArticleFR;
        this.titreArticleEN = titreArticleEN;
        this.resumeArticleFR = resumeArticleFR;
        this.resumeArticleEN = resumeArticleEN;
        this.idCategorie = idCategorie;
        if (idMedia==""){
            this.idMedia = null;
        }else {
            this.idMedia = idMedia;
        }

        this.textPrincipalFR = textPrincipalFR;
        this.textPrincipalEN = textPrincipalEN;
        this.create_by = create_by;
        this.create_le = create_le;
        this.update_by = update_by;
    }

}