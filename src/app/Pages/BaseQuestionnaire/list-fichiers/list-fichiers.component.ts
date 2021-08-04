import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FicheCollecteM} from '../../../Model/FicheCollecteM';
import {FicheCollecteServicee} from '../../../Services/ficheCollecte.service';

// @ts-ignore
import defaultLanguage from "../../../../assets/i18n/fr.json";
// @ts-ignore
import LanguageEN from "../../../../assets/i18n/en.json";




@Component({
  selector: 'app-list-fichiers',
  templateUrl: './list-fichiers.component.html',
  styleUrls: ['./list-fichiers.component.sass']
})
export class ListFichiersComponent implements OnInit, OnDestroy {

  currentLangue = localStorage.getItem("langue");

  heading = 'Liste des fiches de la base de collecte :';
  subheading = '';
  icon = 'pe-7s-timer icon-gradient bg-premium-dark';

  folderName = "";
  iDfolderName="";

  idPlanning : any;

  listFichier: FicheCollecteM[] = [] ;

  isvisible = false;

  constructor(private activateRoute: ActivatedRoute,
              private serviceFiche : FicheCollecteServicee,
              private route: Router) {



  }

  ngOnInit() {
    this.activateRoute.params.subscribe(
      (param)=>{
        this.heading = this.heading+"  "+param.nameBDquestion;
        let idBDquestionnaire =( param.idBDquestion as string).split("#")[0];
        this.idPlanning =(param.idBDquestion as string).split("#")[1];
        this.isvisible = true;
        this.serviceFiche.getFicheCollecteBaseQuestionnaire(idBDquestionnaire).subscribe(
          (reponse)=>{
            this.isvisible = false;
            this.listFichier = (<FicheCollecteM[]>reponse);
          },
          (error)=>{
            console.log(error);
          }
        )
      }
    )
  }

  ngOnDestroy(): void {
  }

}
