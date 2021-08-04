import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-liste-fiche',
  templateUrl: './liste-fiche.component.html',
})
export class ListeFicheComponent implements OnInit {
    heading = 'Liste des fiches de collecte des données';
    subheading = '';
    icon = 'pe-7s-file icon-gradient bg-premium-dark';
  constructor() { }

  ngOnInit() {
  }

}
