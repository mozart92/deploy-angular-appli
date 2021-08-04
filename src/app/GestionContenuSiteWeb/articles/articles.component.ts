import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ArticlesM} from '../../Model/ModelContenuSiteWeb/ArticlesM';
import {CategoriesM} from '../../Model/ModelContenuSiteWeb/CategoriesM';;
import {MultimediaM} from '../../Model/ModelContenuSiteWeb/MultimediaM';
import {ArticlesService} from '../../Services/ServicesSiteWeb/articles/articles.service';
import {MultimediaService} from '../../Services/ServicesSiteWeb/multimedia/multimedia.service';
import {CategoriesService} from '../../Services/ServicesSiteWeb/categories/categories.service';
import {NotificationsGeneralService} from '../../ComposantsPerso/ServiceNotif/notifications-general.service';
import {StatusNotification} from '../../ComposantsPerso/notifications-operation/notifications-operation.component';
import Swal from "sweetalert2";
import {AngularEditorConfig} from '@kolkov/angular-editor';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.sass'],
    styles: [".hide{\n" +
    "    display: none!important;\n" +
    "}\n" +
    "\n" +
    ".show{\n" +
    "    display: block;\n" +
    "}"]
})
export class ArticlesComponent implements OnInit {

    heading = 'Gestion des articles';
    subheading = '';
    icon = 'pe-7s-file icon-gradient bg-premium-dark';

    labelTitreFormulaire = 'Enregistrement des données';
    labelButtonSave = 'Enregistrer';

    TitreArticleFR='Titre article (FR)';
    TitreArticleEN='Titre article (EN)';

    ResumeArticleFR='Resumé article (FR)';
    ResumeArticleEN='Resumé article (EN)';

    TexteArticleFR='Texte principal (FR)';
    TexteArticleEN='Texte principal (EN)';


    ImageVideoArticle='Image ou vidéo';

    titreBoutonEdit='Modifier';
    titreBoutonDelete='Supprimer';


    labelTitreTableau = 'Liste des départements enregistrés';
    actionFormulaire='Enregistrer';
    messageEnregistrement='Enregistrement effectué avec succès!';
    erreurEnregistrement='Erreur enregistrement! Vérifier doublons ou connexion au serveur';

    valeurlabelTitreArticleFR='';
    valeurlabelResumeArticleFR='';
    valeurlabelTitreArticleEN='';
    valeurlabelResumeArticleEN='';
    valeurlabelTexteArticleFR='';
    valeurlabelTexteArticleEN='';
    valeurlabelImageVideoArticle='';
    valeurcategories:any;
    valeurRegion;

    isvisible:boolean= false;

    @ViewChild('formArticle') formArticle;
    @ViewChild('alert') alert;
    @ViewChild('alertError') alertError;

    listArticle: ArticlesM[];
    pageOfItems: Array<any>;
    id:number;
    model: any = {};

    listCategories: CategoriesM[] = [];
    listMedia: MultimediaM[] = [];


  htmlContent = '';
  htmlContentEN = '';

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ]
  };



    constructor(private serviceArticle:ArticlesService,
                private route: ActivatedRoute,
                private router: Router,
                private serviceCategories: CategoriesService,
                private serviceMedia: MultimediaService,
                public serviceNotification : NotificationsGeneralService) { }

  ngOnInit() {
    this.serviceNotification.configShowNotif.showLoading.text = "Chargement données";
    this.serviceNotification.configShowNotif.showLoading.show = true;
      this.serviceArticle.getArticles()
          .subscribe(data=>{
              this.listArticle= (<ArticlesM[]>data);
          },error => {
              console.log(error);
          })

      this.chargeCategories();
      this.chargeMedia();
  }


    chargeCategories(){
        this.serviceCategories.getCategories().subscribe(
            (reponse)=>{
                this.listCategories = (<CategoriesM[]>reponse);

            },
            (error)=>{
                console.log(error)
            }
        )
    }



    onSeeResumeArticle(itemArticleForcadre : ArticlesM){

    }


    onValidArticle(){

    }




    chargeMedia(){
        this.serviceMedia.getAllMedia().subscribe(
            (reponse)=>{
              this.serviceNotification.configShowNotif.showLoading.show = false;
                this.listMedia = (<MultimediaM[]>reponse);
              this.serviceNotification.openToast({
                titre : "Notification",
                message : "Chargement des donnees réussi!!",
                status : StatusNotification.SUCCESS});
            },
            (error)=>{
              this.serviceNotification.configShowNotif.showLoading.show = false;
              this.serviceNotification.openToast({
                titre : "Notification",
                message : "Echec du chargement des donnees, vérifier votre connection au serveur",
                status : StatusNotification.ERROR
              });
                console.log(error)
            }
        )
    }



    cancelAction(){
        this.labelButtonSave="Enregistrer";
        this.actionFormulaire="Enregistrer";
        this.formArticle.resetForm();
    }

    onDeleteArticle(id: number) {

      let  {valFornotif , swalWithBootstrapButtons }  = this.serviceNotification.swalConfirm({
        title: 'Etes-vous sure de vouloir supprimer cette donnees?',
        icon: StatusNotification.WARNING,
        showCancelButton: true,
        confirmButtonText: 'Oui, supprimer !',
        cancelButtonText: 'Non, annuler!',
        reverseButtons: true
      });
      valFornotif.then((result) => {
        if (result.value) {
          this.serviceNotification.configShowNotif.showLoading.text = "Suppression en cours";
          this.serviceNotification.configShowNotif.showLoading.show = true;
          this.serviceArticle.deleteArticle(id).subscribe(
            (reponse)=>{
              this.serviceNotification.configShowNotif.showLoading.show = false;
              this.messageEnregistrement = "suppression effectue avec success!";

              swalWithBootstrapButtons.fire(
                'Suppréssion!',
                this.messageEnregistrement,
                StatusNotification.SUCCESS
              );
              this.ngOnInit();
            },
            (error)=>{
              this.serviceNotification.configShowNotif.showLoading.show = false;
              console.log(error.error.codeNumber);
              this.erreurEnregistrement = "Echec de la suppression, verifier la connection avec le serveur!";
              swalWithBootstrapButtons.fire(
                'Suppréssion!',
                this.erreurEnregistrement,
                StatusNotification.ERROR
              );
            }
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            'Annulation',
            'Vous venez d\'annuler votre opération de suppression',
            'error'
          );
        }
      });
    }



    onSaveArticle(dataForm) {

      console.log(dataForm);
      debugger;

      this.serviceNotification.configShowNotif.showModalBlock = true;
        if(this.actionFormulaire=="Enregistrer") {
            let formatSaveArticle: ArticlesM = new ArticlesM();
            formatSaveArticle = new ArticlesM(
                dataForm.categories,
                dataForm.labelTitreArticleFR,
                dataForm.labelTitreArticleEN,
                dataForm.labelResumeArticleFR,
                dataForm.labelResumeArticleEN,
                dataForm.categories,
                dataForm.labelImageVideoArticle,
                dataForm.labelTexteArticleFR,
                dataForm.labelTexteArticleEN,
                localStorage.getItem("token")
            );


            this.serviceArticle.saveArticle(formatSaveArticle)
                .subscribe(data => {
                  this.serviceNotification.configShowNotif.showModalBlock = false;
                  this.messageEnregistrement = 'Enregistrement fait avec succes!';

                  this.serviceNotification.swalSuccess({
                    icon: StatusNotification.SUCCESS,
                    title: "Enregistrement éffectué avec succés!!",
                    showConfirmButton: true
                  });

                    this.formArticle.resetForm();
                    this.ngOnInit();

                }, error => {
                  this.serviceNotification.configShowNotif.showModalBlock = false;
                  this.erreurEnregistrement = 'Echec de l\'enregistrement, verifier votre connection au serveur';

                  this.serviceNotification.swalError({
                    icon: StatusNotification.ERROR,
                    title: "Echec de l'Opération",
                    text: this.erreurEnregistrement
                  });
                    console.log(error)
                })

        }
        else if(this.actionFormulaire=="Modifier") {
            let formatUpdateArticle: ArticlesM = new ArticlesM();
            formatUpdateArticle = new ArticlesM(
                this.id,
                dataForm.labelTitreArticleFR,
                dataForm.labelTitreArticleEN,
                dataForm.labelResumeArticleFR,
                dataForm.labelResumeArticleEN,
                dataForm.categories,
                dataForm.labelImageVideoArticle,
                dataForm.labelTexteArticleFR,
                dataForm.labelTexteArticleEN,
                null,
                localStorage.getItem("token")
            );

            this.serviceArticle.updateArticle(formatUpdateArticle)
                .subscribe(data => {

                  this.serviceNotification.configShowNotif.showModalBlock = false;
                  this.messageEnregistrement = 'Modification fait avec succes !!!!!';

                  this.serviceNotification.swalSuccess({
                    icon: StatusNotification.SUCCESS,
                    title: "Modification éffectué avec succés!!",
                    showConfirmButton: true
                  });


                  this.formArticle.onReset();
                    this.ngOnInit();
                    this.labelButtonSave = 'Enregistrer';
                    this.actionFormulaire = 'Enregistrer';

                }, error => {
                  this.serviceNotification.configShowNotif.showModalBlock = false;
                  this.erreurEnregistrement = 'Echec de la modification, verifier votre connection avec le serveur!';
                  this.serviceNotification.swalError({
                    icon: StatusNotification.ERROR,
                    title: "Echec de l'Opération",
                    text: this.erreurEnregistrement
                  });

                    console.log(error);
                })
        }

    }

    onSelectArticle(articlee) {

      this.formArticle.resetForm({
        labelTitreArticleFR : articlee.titreArticleFR,
        labelTexteArticleFR : articlee.textPrincipalFR,
        labelResumeArticleFR : articlee.resumeArticleFR,
        labelTitreArticleEN : articlee.titreArticleEN,
        labelTexteArticleEN :  articlee.textPrincipalEN,
        labelResumeArticleEN : articlee.resumeArticleEN,
        labelImageVideoArticle : articlee.media.id,
        categories : articlee.categories.id,
      });

        this.id = articlee.id;
        this.htmlContent=articlee.resumeArticleFR;
        this.htmlContentEN=articlee.resumeArticleEN;
        this.labelButtonSave = 'Modifier';
        this.actionFormulaire = 'Modifier';

    /*  this.valeurlabelTitreArticleFR=articlee.titreArticleFR;
      this.valeurlabelResumeArticleFR=articlee.resumeArticleFR;
      this.valeurlabelTitreArticleEN=articlee.titreArticleEN;
      this.valeurlabelResumeArticleEN=articlee.resumeArticleEN;
      this.valeurlabelTexteArticleFR = articlee.textPrincipalFR;
      this.valeurlabelTexteArticleEN = articlee.textPrincipalEN;
      this.valeurlabelImageVideoArticle = articlee.media.id;
      this.valeurcategories = articlee.categories.id;*/
    }



}
