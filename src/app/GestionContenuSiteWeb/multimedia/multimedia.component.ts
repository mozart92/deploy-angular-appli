import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {MultimediaM} from '../../Model/ModelContenuSiteWeb/MultimediaM';
// @ts-ignore
import * as $ from 'jquery';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {MultimediaService} from '../../Services/ServicesSiteWeb/multimedia/multimedia.service';
import {NotificationsGeneralService} from '../../ComposantsPerso/ServiceNotif/notifications-general.service';
import {StatusNotification} from '../../ComposantsPerso/notifications-operation/notifications-operation.component';
import Swal from "sweetalert2";

@Component({
  selector: 'app-multimedia',
  templateUrl: './multimedia.component.html',
  styleUrls: ['./multimedia.component.sass'],
    styles: [".hide{\n" +
    "    display: none!important;\n" +
    "}\n" +
    "\n" +
    ".show{\n" +
    "    display: block;\n" +
    "}"
    ]
})
export class MultimediaComponent implements OnInit {


    heading = 'Gestion des multimedias';
    subheading = '';
    icon = 'pe-7s-file icon-gradient bg-premium-dark';

    labelTitreFormulaire = 'Enregistrement des données';
    labelButtonSave = 'Enregistrer';

    TitreMFR='Titre FR';
    TitreMEN='Titre EN';
    DescriptionMFR='Description FR';
    DescriptionMEN='Description EN';
    TypeMedia='Type media';
    FichierAttacheM='Fichier Attaché';

    titreBoutonEdit='Modifier';
    titreBoutonDelete='Supprimer';
    categories;

    media: MultimediaM;
    listMedia: Array<MultimediaM> = [];
    isvisible: boolean = false;

    @ViewChild('formMedia') formMedia;
    @ViewChild('alert') alert;
    @ViewChild('alertError') alertError;
    @ViewChild('objlabelFichierAttacheM') objFIle;


    valid: boolean= false;
    titrePathAction = "Enregistrement";
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


    valeurlabelTitreMFR="";
    valeurlabelDescriptionMFR="";
    valeurlabelTypeMedia="";
    valeurlabelDescriptionMEN="";
    valeurlabelFichierAttacheM="";
    valeurlabelTitreMEN="";
    valeurId;

    valuess;

    valeurFichierFinal = "";

    pageOfItems: Array<any>;

    public formData = new FormData();
    ReqJson: any = {};

     public file: FileList;


    constructor(public serviceMedia: MultimediaService,
                public http: HttpClient,
                public serviceNotification : NotificationsGeneralService) { }

  ngOnInit() {

        this.listMedia = [];
    this.serviceNotification.configShowNotif.showLoading.show = true;
      this.serviceMedia.getAllMedia().subscribe(
          (response)=>{
            this.serviceNotification.configShowNotif.showLoading.show = false;
              this.listMedia = (<Array<MultimediaM>>response);
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
      );
  }


    onSelectMedia(formmedia: MultimediaM) {

      this.formMedia.resetForm({
        id : formmedia.id,
        labelTitreMFR :  formmedia.titreFR,
        labelTitreMEN : formmedia.titreEN,
        labelDescriptionMFR : formmedia.descriptionFR,
        labelDescriptionMEN :  formmedia.descriptionEN,
        labelTypeMedia : formmedia.typeMedia
      });

        this.valeurId = formmedia.id;
        this.labelButtonSave = 'Modifier';
        this.actionFormulaire = 'Modifier';

     /* this.valeurlabelTitreMFR = formmedia.titreFR;
      this.valeurlabelTitreMEN = formmedia.titreEN;
      this.valeurlabelDescriptionMFR = formmedia.descriptionFR;
      this.valeurlabelTypeMedia = formmedia.typeMedia;
      this.valeurlabelDescriptionMEN = formmedia.descriptionEN;*/

    }



    onDeleteMedia(id: number) {

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
          this.serviceMedia.deleteMedia(id).subscribe(
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


    onSaveMedia(formMedia : NgForm) {
      this.serviceNotification.configShowNotif.showModalBlock = true;
        if(this.actionFormulaire=="Enregistrer") {

            let forrmatSaveMedia: MultimediaM = new MultimediaM();

            forrmatSaveMedia = new MultimediaM(
                null,
                formMedia.value.labelTitreMFR,
                formMedia.value.labelTitreMEN,
                formMedia.value.labelDescriptionMFR,
                formMedia.value.labelDescriptionMEN,
                this.valeurFichierFinal,
                localStorage.getItem("token"),
                formMedia.value.labelTypeMedia);

            this.serviceMedia.addMedia(forrmatSaveMedia).subscribe(
                (reponse)=>{
                  this.serviceNotification.configShowNotif.showModalBlock = false;
                  this.messageEnregistrement = 'Enregistrement fait avec succes!';

                  this.serviceNotification.swalSuccess({
                    icon: StatusNotification.SUCCESS,
                    title: "Enregistrement éffectué avec succés!!",
                    showConfirmButton: true
                  });
                  // @ts-ignore
                    $("#file").val(undefined);

                    this.formMedia.resetForm();
                    this.ngOnInit();
                },
                (error)=>{
                  // @ts-ignore
                    $("#file").val(undefined);
                  this.serviceNotification.configShowNotif.showModalBlock = false;
                  this.erreurEnregistrement = 'Echec de l\'enregistrement, verifier votre connection au serveur';

                  this.serviceNotification.swalError({
                    icon: StatusNotification.ERROR,
                    title: "Echec de l'Opération",
                    text: this.erreurEnregistrement
                  });
                }
            );

        }
        else if(this.actionFormulaire=="Modifier") {
            let forrmatUpdateMedia: MultimediaM = new MultimediaM();

            forrmatUpdateMedia = new MultimediaM(
                this.valeurId,
                formMedia.value.labelTitreMFR,
                formMedia.value.labelTitreMEN,
                formMedia.value.labelDescriptionMFR,
                formMedia.value.labelDescriptionMEN,
                this.valeurFichierFinal,
                null,
                formMedia.value.labelTypeMedia,
                localStorage.getItem("token")
            );

            this.serviceMedia.updateMedia(forrmatUpdateMedia)
                .subscribe(
                    (response)=> {
                      this.serviceNotification.configShowNotif.showModalBlock = false;
                      this.messageEnregistrement = 'Modification fait avec succes !!!!!';

                      this.serviceNotification.swalSuccess({
                        icon: StatusNotification.SUCCESS,
                        title: "Modification éffectué avec succés!!",
                        showConfirmButton: true
                      });


                        this.formMedia.resetForm();
                        this.ngOnInit();
                        this.labelButtonSave = 'Enregistrer';
                        this.actionFormulaire = 'Enregistrer';

                    },
                    (error) => {

                      this.serviceNotification.configShowNotif.showModalBlock = false;
                      this.erreurEnregistrement = 'Echec de la modification, verifier votre connection avec le serveur!';
                      this.serviceNotification.swalError({
                        icon: StatusNotification.ERROR,
                        title: "Echec de l'Opération",
                        text: this.erreurEnregistrement
                      });

                        console.log(error);
                    }
                )
        }

    }

    cancelAction(){
        this.labelButtonSave="Enregistrer";
        this.formMedia.resetForm();
    }


    uploadFiles(file : FileList){

        let loc = window.location.pathname;
        let dir = loc.substring(0, loc.lastIndexOf('/'));

       this.file =  file;
       let itemfile = file.item(0);
       let typeItemFile = file.item(0).type.split("/");
       if (typeItemFile[0]=="application") {
          this.valeurFichierFinal = itemfile.name;
          let decoupName =  itemfile.name.split(".");
          this.TypeMedia = "Fiche de type "+ decoupName[decoupName.length -1];
          this.valeurlabelTypeMedia = "fichier";
       }else {
           this.valeurFichierFinal = itemfile.name;
           this.TypeMedia = "fichier de type multimedia";
           this.valeurlabelTypeMedia =  itemfile.type.split("/")[0];
       }
    }

    receiveInfoUpload(etatUpload){

        if (etatUpload.status == true){

            this.messageEnregistrement = etatUpload.message;
            this.alert.nativeElement.classList.remove('hide');
            this.alert.nativeElement.classList.add('show');
            this.file = undefined;

        }else {
            this.file = undefined;
            this.erreurEnregistrement = etatUpload.message;
            this.alertError.nativeElement.classList.remove('hide');
            this.alertError.nativeElement.classList.add('show');

        }

    }



}
