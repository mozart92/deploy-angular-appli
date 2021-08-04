/*
import {Component, OnInit, ViewChild} from '@angular/core';
import {UsersService} from '../../../Services/utilisateurs/users.service';
import {Router} from '@angular/router';
import {ProfilGroupService} from '../../../Services/profilGroup/profil-group.service';
import {NgForm} from '@angular/forms';
import {Utilisateurs} from '../../../Model/utilisateurs';
import {InfosTokenUser} from '../../../Model/InfosTokenUser';
import {Group} from '../../../Model/group';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  slideConfig2 = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '0',
    slidesToShow: 1,
    speed: 500,
    dots: true,
  };



  @ViewChild('alert') alert;
  @ViewChild('alertError') alertError;

  isvisible: boolean = false;

  login: String;
  passKey: String;
  isValid: boolean;

  goodNews:boolean=false;
  badNews:boolean=false;

  apparance;
  bgAlert;
  messageAlert

  userCurrent: any;

  messageEnregistrement="l'enregistrement fait avec succes";
  erreurEnregistrement="erreur de l'authentification, verifier la connection avec votre serveur";



  constructor(private serviceuser: UsersService,
              private route: Router,
              private serviceProfil: ProfilGroupService) {
  }

  ngOnInit() {
  }



  onInfoUserAuth(formAuth: NgForm) {
    this.isvisible = true;

    if (formAuth.value.langue == '') {
      localStorage.setItem('langue', 'FR');
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

          localStorage.setItem('tokenType', (<string>formatInfoUser.tokenType));
          localStorage.setItem('nameUserCurrent', (<string>formatInfoUser.utilisateur.nomPrenom));
          localStorage.setItem('region', (<string>formatInfoUser.utilisateur.regionUser));
          localStorage.setItem('departement', (<string>formatInfoUser.utilisateur.departementUser));
          localStorage.setItem('commune', (<string>formatInfoUser.utilisateur.communeUser));
          localStorage.setItem('fonction', (<string>functionUser));
          localStorage.setItem('allFunctionUserCurrent', JSON.stringify(listGroupFunctionUser));
          localStorage.setItem('privilege', JSON.stringify(formatInfoUser.privilege));

          this.isvisible = false;
          this.route.navigate(['Dashboads']);
          this.alert.nativeElement.classList.remove('hide');
          this.alert.nativeElement.classList.add('show');

        } else {
          this.isvisible = false;
          this.erreurEnregistrement = 'Désolé vous ne pouvait accéder à ce compte sans une fonction associe à celui. Contacter l\'administrateur ';
          this.alertError.nativeElement.classList.remove('hide');
          this.alertError.nativeElement.classList.add('show');
          this.alertError.style;
        }


      },
      (error) => {
        console.log(error);
        this.isvisible = false;
        this.alertError.nativeElement.classList.remove('hide');
        this.alertError.nativeElement.classList.add('show');
        this.alertError.style;
      }
    );

  }


}
*/
