import {Component, OnInit, ViewChild} from '@angular/core';
import {Group} from '../../../Model/group';
import {ProfilGroupService} from '../../../Services/profilGroup/profil-group.service';
import {UsersService} from '../../../Services/utilisateurs/users.service';
import {InfosTokenUser} from '../../../Model/InfosTokenUser';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {Utilisateurs} from '../../../Model/utilisateurs';
import {NotificationsGeneralService} from '../../../ComposantsPerso/ServiceNotif/notifications-general.service';
import {StatusNotification} from '../../../ComposantsPerso/notifications-operation/notifications-operation.component';
import defaultLanguage from "../../../../assets/i18n/fr.json";
import LanguageEN from "../../../../assets/i18n/en.json";
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-login-page-syrem',
  templateUrl: './login-page-syrem.component.html',
  styleUrls: ['./login-page-syrem.component.sass'],
  styles : [`
    .ng-touched.ng-invalid{
      border-color: red;
    }
    .hide{
      display: none!important;
    }
    .show{
      display: block;
    }
  `]
})
export class LoginPageSyremComponent implements OnInit {


  isvisible: boolean = false;

  login: String;
  passKey: String;

  messageEnregistrement="l'enregistrement fait avec succes";
  erreurEnregistrement="erreur de l'authentification, verifier la connection avec votre serveur";

  simulte : string;

  constructor(private serviceuser: UsersService,
              private route: Router,
              private serviceProfil: ProfilGroupService,
              private serviceNotification : NotificationsGeneralService,
              private translate : TranslateService) {
    translate.setTranslation('fr', defaultLanguage);
    translate.setDefaultLang('fr');
  }

  ngOnInit() {
  }

  onChangeLangue(detail){
    if (detail.value=="fr"){
      this.translate.setTranslation(`${detail.value}`, defaultLanguage);
      this.translate.use(`${detail.value}`);
    }
    if (detail.value=="en"){
      this.translate.setTranslation(`${detail.value}`, LanguageEN);
      this.translate.use(`${detail.value}`);
    }
  }

  onInfoUserAuth(formAuth: NgForm) {

    this.serviceNotification.configShowNotif.showLoading.text = "Connexion en cours";
    this.serviceNotification.configShowNotif.showLoading.show = true;
    if (formAuth.value.langue == '') {
      localStorage.setItem('langue', 'fr');
    } else {
      localStorage.setItem('langue', formAuth.value.langue);
    }

    const userData: Utilisateurs = new Utilisateurs(
      0,
      '',
      '',
      formAuth.value.login,
      '',
      '',
      formAuth.value.passkey,
      ''
    );

    this.serviceuser.getOneUser(userData).subscribe(
      (data) => {
        this.serviceNotification.configShowNotif.showLoading.show = false;

        let formatInfoUser: InfosTokenUser = (<InfosTokenUser>data);


        let listGroupFunctionUser: Group[] = [];

        let i = 0;
        for (let value of formatInfoUser.utilisateur.groupes) {
          if (value.typeGroupes == 'Fonction') {
            listGroupFunctionUser.push(formatInfoUser.utilisateur.groupes[i]);
          }
          i++;
        }


        if (listGroupFunctionUser.length >= 1) {

          let functionUser: String = listGroupFunctionUser[0].libelleGroupe;

          localStorage.setItem('accessToken', (<string>formatInfoUser.accessToken));

          localStorage.setItem('privilsUser', JSON.stringify(formatInfoUser.privilege));

          localStorage.setItem('token', (<string>formatInfoUser.utilisateur.email));


          if (formatInfoUser.utilisateur.themesUsers==null){
            localStorage.setItem('headerTheme', '');
            localStorage.setItem('sidebarTheme', '');
          }else{
            localStorage.setItem('headerTheme', formatInfoUser.utilisateur.themesUsers.headerTheme);
            localStorage.setItem('sidebarTheme', formatInfoUser.utilisateur.themesUsers.sidebarTheme);
          }

          localStorage.setItem('tokenType', (<string>formatInfoUser.tokenType));
          localStorage.setItem('nameUserCurrent', (<string>formatInfoUser.utilisateur.nomPrenom));
          localStorage.setItem('region', (<string>formatInfoUser.utilisateur.regionUser));
          localStorage.setItem('departement', (<string>formatInfoUser.utilisateur.departementUser));
          localStorage.setItem('commune', (<string>formatInfoUser.utilisateur.communeUser));
          localStorage.setItem('fonction', (<string>functionUser));
          localStorage.setItem('allFunctionUserCurrent', JSON.stringify(listGroupFunctionUser));
          localStorage.setItem('privilege', JSON.stringify(formatInfoUser.privilege));
          if (localStorage.getItem(`elementStatConfig_${localStorage.getItem("token")}`)=="undefined"){
            localStorage.setItem(`elementStatConfig_${localStorage.getItem("token")}`, this.simulte);
          }

          this.serviceNotification.openToast({
            titre : 'Notification',
            message : "Connexion au systeme SYSTEM réussi!!! ",
            status : StatusNotification.SUCCESS
          });

          this.route.navigate(['pages/general-view']);


        } else {
          this.erreurEnregistrement = 'Désolé vous ne pouvait accéder à ce compte sans une fonction associe à celui. Contacter l\'administrateur ';
          this.serviceNotification.openToast({
            titre : 'Echec de connexion',
            message : this.erreurEnregistrement,
            status : StatusNotification.ERROR
          });

        }


      },
      (error) => {
        console.log(error);
        this.serviceNotification.configShowNotif.showLoading.show = false;
        this.erreurEnregistrement = 'Désolé vous ne pouvez accéder é ce system, vérifier votre connexion au serveur';
        this.serviceNotification.openToast({
          titre : 'Echec de connexion',
          message : this.erreurEnregistrement,
          status : StatusNotification.ERROR
        });
      }
    );

  }

}
