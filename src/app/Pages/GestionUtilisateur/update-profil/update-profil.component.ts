import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Utilisateurs} from '../../../Model/utilisateurs';
import {NgForm} from '@angular/forms';
import {UsersService} from '../../../Services/utilisateurs/users.service';
import {Router} from '@angular/router';
import {NotificationsGeneralService} from '../../../ComposantsPerso/ServiceNotif/notifications-general.service';
import {StatusNotification} from '../../../ComposantsPerso/notifications-operation/notifications-operation.component';
import {ModeProductionService} from '../../../PlatesFormes/mode-production.service';

@Component({
  selector: 'app-update-profil',
  templateUrl: './update-profil.component.html',
  styleUrls: ['./update-profil.component.css']
})
export class UpdateProfilComponent implements OnInit, OnDestroy {

  heading = 'Gestion des profils utilisateurs';
  subheading = '';
  icon = 'pe-7s-users icon-gradient bg-premium-dark';


  @ViewChild('formuser') formuser;
  @ViewChild('alert') alert;
  @ViewChild('alertError') alertError;

  messageEnregistrement = 'Enregistrement effectué avec succès!';
  erreurEnregistrement = 'Erreur enregistrement! Vérifier doublons ou connexion au serveur';

  isvisible: boolean = false;

  currentUserConnect: Utilisateurs = new Utilisateurs();


  constructor(public serviceUser: UsersService,
              public router: Router,
              public serviceNotification : NotificationsGeneralService,
              public modeApply : ModeProductionService) {}

  ngOnInit() {
    this.serviceNotification.configShowNotif.showLoading.text = "Chargement en cours";
    this.serviceNotification.configShowNotif.showLoading.show = true;
    this.serviceUser.getUtilisateurByEmail().subscribe(
      (response) => {
        this.currentUserConnect = (response as Utilisateurs);
        this.serviceNotification.configShowNotif.showLoading.show = false;
        this.serviceNotification.openToast({
          titre : "Notification",
          message : "Chargement du profil utilisateur terminé!!",
          status : StatusNotification.SUCCESS});
      },
      (error) => {
        console.log(error);
        this.serviceNotification.configShowNotif.showLoading.show = false;
        this.serviceNotification.openToast({
          titre : "Notification",
          message : "Echec du chargement du profil utilisateur",
          status : StatusNotification.ERROR});
      }
    )
  }

  ngOnDestroy(): void {}


  onUpdateProfilUser(formuser: NgForm) {

    let truePassword: string;
    if (formuser.value.password != '' && formuser.value.oldPassword != '') {
      truePassword = formuser.value.password + '#' + formuser.value.oldPassword;
    } else {
      truePassword = null;
    }

    let userDataSend: Utilisateurs = new Utilisateurs(
      null,
      formuser.value.nomprenom,
      formuser.value.tel,
      null,
      formuser.value.sexe,
      null,
      truePassword,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    );

    this.serviceNotification.configShowNotif.showLoading.text = "Chargement profil utilisateur";
    this.serviceNotification.configShowNotif.showLoading.show = true;
    this.serviceUser.updateProfilUser(userDataSend)
      .subscribe(
        (response) => {
          this.serviceNotification.configShowNotif.showLoading.show = false;
          this.messageEnregistrement = 'Modification éffectués avec succes !!!!!';

          this.serviceNotification.openToast({
            titre : "Notification",
            message : this.messageEnregistrement,
            status : StatusNotification.SUCCESS});

          this.ngOnInit();

          if (userDataSend.password != null || formuser.value.nomprenom !=localStorage.getItem("nameUserCurrent")) {
            this.router.navigate(['/pages/authentification']);
          }

        },
        (error) => {
          this.serviceNotification.configShowNotif.showLoading.show = false;
          if (error.error.codeNumber == 101) {
            this.erreurEnregistrement = 'Ancien mot de passe incorrecte';
            this.serviceNotification.swalError({
              icon: StatusNotification.ERROR,
              title: "Echec de l'Opération",
              text: this.erreurEnregistrement
            });
          } else {
            this.erreurEnregistrement = 'Echec de la modification, de  votre compte utilisateur!';
            this.serviceNotification.swalError({
              icon: StatusNotification.ERROR,
              title: "Echec de l'Opération",
              text: this.erreurEnregistrement
            });
          }
          console.log(error);
        }
      )
  }

  closeAlert() {
    this.alert.nativeElement.classList.remove('show');
    this.alert.nativeElement.classList.add('hide');
  }

  closeAlertError() {
    this.alertError.nativeElement.classList.remove('show');
    this.alertError.nativeElement.classList.add('hide');
  }


}
