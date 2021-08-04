import { Injectable } from '@angular/core';
import { ArchitectUIState } from './index';
import { NgRedux } from '@angular-redux/store';
import {ThemesUsersM} from '../../Model/ThemesUsersM';
import {ThemesUsersService} from '../../Services/personalisationInterface/themes-users.service';
import {NotificationsGeneralService} from '../../ComposantsPerso/ServiceNotif/notifications-general.service';
import {StatusNotification} from '../../ComposantsPerso/notifications-operation/notifications-operation.component';

@Injectable()
export class ConfigActions {
  static CONFIG_GET = 'CONFIG_GET';
  static CONFIG_UPDATE = 'CONFIG_UPDATE';

  instaceThemeUser : ThemesUsersM = new ThemesUsersM();

  constructor(
    private ngRedux: NgRedux<ArchitectUIState>,
    private serviceThemesUsers : ThemesUsersService,
    private serviceNotification : NotificationsGeneralService
  ) { }

  getConfig() {
    this.ngRedux.dispatch({
      type: ConfigActions.CONFIG_GET,
    });
  }

  updateConfig(config): void {
    this.traitmentConfigTheme((config as ThemesUsersM));

    this.ngRedux.dispatch({
      type: ConfigActions.CONFIG_UPDATE,
      payload: config
    });
  }

  traitmentConfigTheme(config : ThemesUsersM){

    if(config.headerTheme==undefined){
      this.instaceThemeUser.sidebarTheme = config.sidebarTheme;
    }
    if(config.sidebarTheme==undefined){
      this.instaceThemeUser.headerTheme = config.headerTheme;
    }

    console.log("voici le ddd : ", this.instaceThemeUser);


  }

  onAppliqConfig(){
   this.serviceNotification.configShowNotif.showLoading.text = "Changement thème encour";
   this.serviceNotification.configShowNotif.showLoading.show = true;
    this.serviceThemesUsers.personnalisationTheme(this.instaceThemeUser).subscribe(
      (response)=>{
        console.log(response);
        this.serviceNotification.configShowNotif.showLoading.show = false;
        this.serviceNotification.openToast({
          titre : 'Notification',
          message : "Changement de thème réussi!!",
          status : StatusNotification.SUCCESS
        });
        localStorage.setItem('headerTheme', this.instaceThemeUser.headerTheme);
        localStorage.setItem('sidebarTheme', this.instaceThemeUser.sidebarTheme);
        this.instaceThemeUser = new ThemesUsersM(undefined, undefined, undefined);
      },
      (error)=>{
        this.serviceNotification.configShowNotif.showLoading.show = false;
        console.log(error);
        this.serviceNotification.openToast({
          titre : 'Notification',
          message : "Echec de changement de thème",
          status : StatusNotification.ERROR
        })
      }
    );
  }

}
