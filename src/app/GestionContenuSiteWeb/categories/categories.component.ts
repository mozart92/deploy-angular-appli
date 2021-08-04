import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoriesM} from '../../Model/ModelContenuSiteWeb/CategoriesM';
import {CategoriesService} from '../../Services/ServicesSiteWeb/categories/categories.service';
import {NotificationsGeneralService} from '../../ComposantsPerso/ServiceNotif/notifications-general.service';
import {StatusNotification} from '../../ComposantsPerso/notifications-operation/notifications-operation.component';
import Swal from "sweetalert2";


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.sass'],
    styles: [".hide{\n" +
    "    display: none!important;\n" +
    "}\n" +
    "\n" +
    ".show{\n" +
    "    display: block;\n" +
    "}"]
})
export class CategoriesComponent implements OnInit {

    heading = 'Gestion des catégories';
    subheading = '';
    icon = 'pe-7s-file icon-gradient bg-premium-dark';

    labelTitreFormulaire = 'Enregistrement des données';
    labelButtonSave = 'Enregistrer';

    LibelleCategorieEN='Libellé catégorie (EN)';
    LibelleCategorieFR='Libellé catégorie (FR)';
    ParentCategorie='Parent';


    selectlibelleCategorieEN= 'Choisir...';
    labelTitreTableau = 'Liste des départements enregistrés';
    actionFormulaire='Enregistrer';
    messageEnregistrement='Enregistrement effectué avec succès!';
    erreurEnregistrement='Erreur enregistrement! Vérifier doublons ou connexion au serveur';

    valeurlibelleCategorieFR='';
    valeurlibelleCategorieEN='';
    valeurParentCategorie:any;


    isvisible:boolean= false;

    @ViewChild('formCategories') formCategories;
    @ViewChild('alert') alert;
    @ViewChild('alertError') alertError;

    categories: CategoriesM[];
    pageOfItems: Array<any>;
    id:number;
    model: any = {};

    listCategories: CategoriesM[] = [];



    constructor(public serviceCategories:CategoriesService,
                public route: ActivatedRoute,
                public router: Router,
                public serviceNotification : NotificationsGeneralService) { }

  ngOnInit() {

    this.serviceNotification.configShowNotif.showLoading.show = true;

      this.serviceCategories.getCategories()
          .subscribe(data=>{
            this.serviceNotification.configShowNotif.showLoading.show = false;
              this.categories= (<CategoriesM[]>data);
              this.listCategories= (<CategoriesM[]>data);
            this.serviceNotification.openToast({
              titre : "Notification",
              message : "Chargement des donnees réussi!!",
              status : StatusNotification.SUCCESS});
          },error => {
            this.serviceNotification.configShowNotif.showLoading.show = false;
            this.serviceNotification.openToast({
              titre : "Notification",
              message : "Echec du chargement des donnees, vérifier votre connection au serveur",
              status : StatusNotification.ERROR
            });
              console.log(error);
          })

  }



    onChangePage(pageOfItems: Array<any>) {
        this.pageOfItems = pageOfItems;
    }



    cancelAction(){
        this.labelButtonSave="Enregistrer";
        this.formCategories.resetForm();
    }

    onDeleteCategories(id: number) {

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
          this.serviceCategories.deleteCategories(id).subscribe(
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



    onSaveCategories(dataForm) {

      this.serviceNotification.configShowNotif.showModalBlock = true;
        if(this.actionFormulaire=="Enregistrer") {

           let formatCategories: CategoriesM = new CategoriesM();
            formatCategories = new CategoriesM(null,
                dataForm.libelleCategorieFR,
                dataForm.libelleCategorieEN,
                localStorage.getItem("token"),
                null,
                dataForm.parentCategorie
            );

            this.serviceCategories.saveCategories(formatCategories)
                .subscribe(
                    data => {
                      this.serviceNotification.configShowNotif.showModalBlock = false;
                      this.messageEnregistrement = 'Enregistrement fait avec succes!';

                      this.serviceNotification.swalSuccess({
                        icon: StatusNotification.SUCCESS,
                        title: "Enregistrement éffectué avec succés!!",
                        showConfirmButton: true
                      });

                    this.formCategories.resetForm();
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

            let formatCategoriesForUpdate: CategoriesM = new CategoriesM();

            formatCategoriesForUpdate = new CategoriesM(this.id,
                dataForm.libelleCategorieFR,
                dataForm.libelleCategorieEN,
                null,
                localStorage.getItem("token"),
                dataForm.parentCategorie
            );

            this.serviceCategories.updateCategories(formatCategoriesForUpdate)
                .subscribe(
                    data => {
                      this.serviceNotification.configShowNotif.showModalBlock = false;
                      this.messageEnregistrement = 'Modification fait avec succes !!!!!';

                      this.serviceNotification.swalSuccess({
                        icon: StatusNotification.SUCCESS,
                        title: "Modification éffectué avec succés!!",
                        showConfirmButton: true
                      });


                      this.formCategories.resetForm();
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

    onSelectCategories(categories : CategoriesM) {
        this.intValeurChamps();
      this.formCategories.resetForm({
        libelleCategorieFR : categories.libelleCategoriesFR,
        libelleCategorieEN : categories.libelleCategoriesEN,
        parentCategorie : categories.parentMenu.id
      });

      this.id = categories.id;
      this.labelButtonSave = 'Modifier';
      this.actionFormulaire = 'Modifier';


     /* this.valeurlibelleCategorieFR=categories.libelleCategoriesFR;
      this.valeurlibelleCategorieEN=categories.libelleCategoriesEN;
      this.valeurParentCategorie=categories.parentMenu.id;*/

    }


    intValeurChamps() {
        this.id = null;
        this.valeurlibelleCategorieFR="";
        this.valeurlibelleCategorieEN="";
        this.valeurParentCategorie="";
        this.labelButtonSave = 'Modifier';
        this.actionFormulaire = 'Modifier';
    }

}
