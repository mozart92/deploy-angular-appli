import {Component, OnInit, ViewChild} from '@angular/core';
import {UsersService} from '../../../Services/utilisateurs/users.service';
import {Router} from '@angular/router';
import {ProfilGroupService} from '../../../Services/profilGroup/profil-group.service';
import {NgForm} from '@angular/forms';
import {Utilisateurs} from '../../../Model/utilisateurs';
import {InfosTokenUser} from '../../../Model/InfosTokenUser';
import {Group} from '../../../Model/group';
import defaultLanguage from "../../../../assets/i18n/fr.json";
import LanguageEN from "../../../../assets/i18n/en.json";

import {
  StatusNotification
} from '../../../ComposantsPerso/notifications-operation/notifications-operation.component';
import {NotificationsGeneralService} from '../../../ComposantsPerso/ServiceNotif/notifications-general.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-login-page-cahis',
  templateUrl: './login-page-cahis.component.html',
  styleUrls: ['./login-page-cahis.component.sass']
})
export class LoginPageCahisComponent implements OnInit {


  slideConfig2 = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '0',
    slidesToShow: 1,
    speed: 500,
    dots: true,
  };

  isvisible: boolean = false;

  login: String;
  passKey: String;

  messageEnregistrement="Connexion au systeme CAHIS réussie";
  erreurEnregistrement="Echec de connection";

  constructor(private serviceuser: UsersService,
              private route: Router,
              private serviceProfil: ProfilGroupService,
              private translate : TranslateService,
              public serviceNotification : NotificationsGeneralService) {
          translate.setTranslation('fr', defaultLanguage);
           translate.setDefaultLang('fr');
  }

  ngOnInit(): void {}

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
      this.translate.use("fr");
    } else {
      localStorage.setItem('langue', formAuth.value.langue);
      this.translate.use(`${formAuth.value.langue}`);
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
          localStorage.setItem('czvUser', (<string>formatInfoUser.utilisateur.czvUser));
          localStorage.setItem('fonction', (<string>functionUser));
          localStorage.setItem('allFunctionUserCurrent', JSON.stringify(listGroupFunctionUser));
          localStorage.setItem('privilege', JSON.stringify(formatInfoUser.privilege));
          if (localStorage.getItem(`elementStatConfig_${localStorage.getItem("token")}`)=="undefined"){
            localStorage.setItem(`elementStatConfig_${localStorage.getItem("token")}`, undefined);
          }



          this.serviceNotification.activeChangeState();
          this.serviceNotification.configShowNotif.showLoading.show = false;
          this.serviceNotification.configShowNotif.showToast = true;
          this.serviceNotification.configToast.status = StatusNotification.SUCCESS;
          this.serviceNotification.configToast.message = this.messageEnregistrement;

          this.route.navigate(['pages/general-view']);


        } else {
          this.serviceNotification.activeChangeState();
          this.serviceNotification.configShowNotif.showLoading.show = false;
          this.serviceNotification.configShowNotif.showToast = true;
          this.serviceNotification.configToast.status = StatusNotification.ERROR;
          this.serviceNotification.configToast.message = 'Désolé vous ne pouvait accéder à ce compte sans une fonction associe à celui. Contacter l\'administrateur ';
          //this.isvisible = false;
        }
      },
      (error) => {
        console.log(error);
        this.serviceNotification.activeChangeState();
        this.serviceNotification.configShowNotif.showLoading.show = false;
        this.serviceNotification.configShowNotif.showToast = true;
        this.serviceNotification.configToast.status = StatusNotification.ERROR;
        this.serviceNotification.configToast.message = this.erreurEnregistrement;
      }
    );

  }


}
