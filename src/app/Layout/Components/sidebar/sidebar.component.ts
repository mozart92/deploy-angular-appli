import { Component, HostListener, OnInit } from '@angular/core';
import { ThemeOptions } from '../../../theme-options';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PerfectScrollbarConfigInterface,
  PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import {GeneralService} from '../../../Services/general/general.service';
import {ModeProductionService} from '../../../PlatesFormes/mode-production.service';
import {AnwserQuestionsService} from '../../../Services/anwserQuestions/anwser-questions.service';
import {TranslateService} from '@ngx-translate/core';

import defaultLanguage from "../../../../assets/i18n/fr.json";
import LanguageEN from "../../../../assets/i18n/en.json";


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  public extraParameter: any;

  currentLangue = localStorage.getItem("langue");

  constructor(public globals: ThemeOptions,
              private activatedRoute: ActivatedRoute,
              public servicegeneral: GeneralService,
              public modeApply : ModeProductionService,
              public serviceData : AnwserQuestionsService,
              private translate : TranslateService) {
    translate.setTranslation(localStorage.getItem("langue"), localStorage.getItem("langue")=='fr' ? defaultLanguage : LanguageEN);
    translate.use(localStorage.getItem("langue"))
  }

  @select('config') public config$: Observable<any>;

  public config: PerfectScrollbarConfigInterface = {};
  private newInnerWidth: number;
  private innerWidth: number;
  activeId = 'dashboards';

  toggleSidebar() {
    this.globals.toggleSidebar = !this.globals.toggleSidebar;
    this.globals.sidebarHover = !this.globals.toggleSidebar;
  }

  sidebarHover() {
    this.globals.sidebarHover = !this.globals.sidebarHover;
  }

  sidebarHoverMouseOut() {
    this.globals.sidebarHover = false;
  }

  sidebarHoverMouseIn() {
    this.globals.sidebarHover = true;
  }


  ngOnInit() {

    setTimeout(() => {
      this.innerWidth = window.innerWidth;
      if (this.innerWidth < 1200) {
        this.globals.toggleSidebar = true;
      }
    });

    this.extraParameter = this.activatedRoute.snapshot.firstChild.routeConfig.path;

  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.newInnerWidth = event.target.innerWidth;

    if (this.newInnerWidth < 1200) {
      this.globals.toggleSidebar = true;
    } else {
      this.globals.toggleSidebar = false;
    }

  }
}
