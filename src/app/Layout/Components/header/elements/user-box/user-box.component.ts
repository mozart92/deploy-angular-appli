import {Component, OnInit} from '@angular/core';
import {faCalendar} from '@fortawesome/free-solid-svg-icons';
import {ThemeOptions} from '../../../../../theme-options';
import {Router} from '@angular/router';
import {ModeProductionService, TypeModeAffichageIndiceStat} from '../../../../../PlatesFormes/mode-production.service';

@Component({
  selector: 'app-user-box',
  templateUrl: './user-box.component.html',
  styles : [`
    .trait-mode {
      background: #dee2e6;
      width: 1px;
      height: 35px;
      margin-left: 15px;
    }
  `]
})
export class UserBoxComponent implements OnInit {

  faCalendar = faCalendar;



  nameConnect="";
  function="";

  constructor(public globals: ThemeOptions, private route: Router, public serviceGeneral : ModeProductionService) {
  }

  ngOnInit() {
    this.nameConnect = localStorage.getItem("token");
    this.function = localStorage.getItem("fonction");
  }



  toggleDrawer() {
    this.globals.toggleDrawer = !this.globals.toggleDrawer;
  }

  onLogout(){

    localStorage.removeItem("token");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("privilege");
    localStorage.removeItem("allFunctionUserCurrent");
    localStorage.removeItem("commune");
    localStorage.removeItem("fonction");
    localStorage.removeItem("departement");
    localStorage.removeItem("region");
    localStorage.removeItem("nameUserCurrent");
    localStorage.removeItem("tokenType");
    localStorage.removeItem("langue");
    localStorage.removeItem("privilsUser");
    this.route.navigate(['/pages/authentification']);
  }

  onChangeServiceMode(){
    if (this.serviceGeneral.MODE_AFFICHAGE == TypeModeAffichageIndiceStat.MODE_TAUX){
      this.serviceGeneral.MODE_AFFICHAGE = TypeModeAffichageIndiceStat.MODE_POURCENTAGE;
    }else if (this.serviceGeneral.MODE_AFFICHAGE == TypeModeAffichageIndiceStat.MODE_POURCENTAGE) {
      this.serviceGeneral.MODE_AFFICHAGE = TypeModeAffichageIndiceStat.MODE_TAUX;
    }
  }


}
