import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.sass']
})
export class ContactUsComponent implements OnInit {
  heading = 'Contacter nous';
  subheading = "Pour tous vos problemes relatives au systeme, n'exiter pas joingner nous à travers les contacts ci-dessous";
  icon = 'pe-7s-config icon-gradient bg-premium-dark';

  constructor() { }

  ngOnInit() {
  }

}
