import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guide-utilisateur',
  templateUrl: './guide-utilisateur.component.html',
  styleUrls: ['./guide-utilisateur.component.sass']
})
export class GuideUtilisateurComponent implements OnInit {

  heading = 'Guide Pour l\'administrateur du systeme';
  subheading = "Tout ce que les utilisateurs de ce systeme doivent savoir pour une meilleur utilisation de celui-ci";
  icon = 'pe-7s-config icon-gradient bg-premium-dark';

  constructor() { }

  ngOnInit() {
  }

}
