import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gui-administration',
  templateUrl: './gui-administration.component.html',
  styleUrls: ['./gui-administration.component.sass']
})
export class GuiAdministrationComponent implements OnInit {
  heading = 'Guide Pour l\'administrateur du systeme' ;
  subheading = "Tout ce que les administrateurs de ce systeme doivent savoir pour une meilleur utilisation de celui-ci";
  icon = 'pe-7s-config icon-gradient bg-premium-dark';

  constructor() { }

  ngOnInit() {
  }

}
