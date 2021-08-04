import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FaqM} from '../../Model/ModelContenuSiteWeb/FaqM';
import {FaqService} from '../../Services/ServicesSiteWeb/faq/faq.service';
import {NotificationsGeneralService} from '../../ComposantsPerso/ServiceNotif/notifications-general.service';
import {StatusNotification} from '../../ComposantsPerso/notifications-operation/notifications-operation.component';
import Swal from "sweetalert2";

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.sass'],
    styles: [".hide{\n" +
    "    display: none!important;\n" +
    "}\n" +
    "\n" +
    ".show{\n" +
    "    display: block;\n" +
    "}"
    ]
})
export class FaqComponent implements OnInit, OnDestroy {

    heading = 'Gestion des FAQs';
    subheading = '';
    icon = 'pe-7s-file icon-gradient bg-premium-dark';

    labelTitreFormulaire = 'Enregistrement des données';
    labelButtonSave = 'Enregistrer';

    labelQuestionFAQFR='Question FR';
    QuestionFAQEN='Question EN';
    ReponseFAQEN='Reponse EN';
    ReponseFAQFR='Reponse FR';
    titreBoutonEdit='Modifier';
    titreBoutonDelete='Supprimer';

    isvisible: boolean = false;

    codeRegionLabel = 'Code de la région';
    codeRegionErrorMessage = 'Code de la région est invalide';
    libeleRegionLabelFR = 'Libellé région FR';
    libeleRegionFRerrorMessage = 'Libellé région FR est invalide';
    libeleRegionLabelEN = 'Libellé région EN';
    libeleRegionENerrorMessage = 'Libellé région EN est invalide';
    labelTitreTableau = 'Liste des régions enregistrés';
    actionFormulaire='Enregistrer';
    messageEnregistrement='Enregistrement effectué avec succès!';
    erreurEnregistrement='Erreur enregistrement! Vérifier doublons ou connexion au serveur';

    valeurquestionFAQFR='';
    valeurlabelReponseFAQFR='';
    valeurlabelQuestionFAQEN='';
    valeurlabelReponseFAQEN='';

    @ViewChild('formFaq') formFaq;
    @ViewChild('alert') alert;
    @ViewChild('alertError') alertError;

    faqs: FaqM[] = [];
    pageOfItems: Array<any>;
    id:number;
    model: any = {};

    constructor(private serviceFaq: FaqService,
                public serviceNotification : NotificationsGeneralService) { }

  ngOnInit() {

    this.serviceNotification.configShowNotif.showLoading.show = true;
      this.serviceFaq.getFaq()
          .subscribe(data=>{
            this.serviceNotification.configShowNotif.showLoading.show = false;
              this.faqs= (<FaqM[]>data);
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

    ngOnDestroy(): void {}

  onChangePage(pageOfItems: Array<any>) {
        // update current page of items
        this.pageOfItems = pageOfItems;
    }
    //Code Affichage ------------------------------------------------------------------------



    onDeleteFaq(id: number) {

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
          this.serviceNotification.configShowNotif.showLoading.text = "Suppression Encour";
          this.serviceNotification.configShowNotif.showLoading.show = true;
          this.serviceFaq.deleteFaq(id).subscribe(
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



    onSaveFaq(dataForm) {

      this.serviceNotification.configShowNotif.showModalBlock = true;

        if(this.actionFormulaire=="Enregistrer") {
            let formatFaqSend: FaqM = new FaqM();

            formatFaqSend = new FaqM(
                null,
                dataForm.questionFAQFR,
                dataForm.questionFAQEN,
                dataForm.labelReponseFAQFR,
                dataForm.labelReponseFAQEN,
                localStorage.getItem("token"));


            this.serviceFaq.saveFaq(formatFaqSend)
                .subscribe(data => {
                  this.serviceNotification.configShowNotif.showModalBlock = false;
                  this.messageEnregistrement = 'Enregistrement fait avec succes!';

                  this.serviceNotification.swalSuccess({
                    icon: StatusNotification.SUCCESS,
                    title: "Enregistrement éffectué avec succés!!",
                    showConfirmButton: true
                  });

                  this.formFaq.resetForm();
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


            let formatFaqUpdate: FaqM = new FaqM();

            formatFaqUpdate = new FaqM(
                this.id,
                dataForm.questionFAQFR,
                dataForm.questionFAQEN,
                dataForm.labelReponseFAQFR,
                dataForm.labelReponseFAQEN,
                null,
                localStorage.getItem("token"));


            this.serviceFaq.updateFaq(formatFaqUpdate)
                .subscribe(data => {
                  this.serviceNotification.configShowNotif.showModalBlock = false;
                  this.messageEnregistrement = 'Modification fait avec succes !!!!!';

                  this.serviceNotification.swalSuccess({
                    icon: StatusNotification.SUCCESS,
                    title: "Modification éffectué avec succés!!",
                    showConfirmButton: true
                  });


                    this.formFaq.resetForm();
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

    onSelectFaq(faq) {

      this.formFaq.resetForm({
        questionFAQFR :faq.questionFR,
        labelReponseFAQFR : faq.reponseFR,
        questionFAQEN : faq.questionEN,
        labelReponseFAQEN : faq.reponseEN
      });

        this.id = faq.id;
        this.labelButtonSave = 'Modifier';
        this.actionFormulaire = 'Modifier'

      /*this.valeurquestionFAQFR=faq.questionFR;
      this.valeurlabelReponseFAQFR=faq.reponseFR;
      this.valeurlabelQuestionFAQEN=faq.questionEN;
      this.valeurlabelReponseFAQEN=faq.reponseEN;;*/
    }



    cancelAction(){
        this.labelButtonSave="Enregistrer";
        this.formFaq.resetForm();
    }



}
