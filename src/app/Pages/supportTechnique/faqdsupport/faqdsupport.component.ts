import { Component, OnInit } from '@angular/core';
import {FaqM} from '../../../Model/ModelContenuSiteWeb/FaqM';
import {FaqService} from '../../../Services/ServicesSiteWeb/faq/faq.service';

@Component({
  selector: 'app-faqdsupport',
  templateUrl: './faqdsupport.component.html',
  styleUrls: ['./faqdsupport.component.css']
})
export class FAQDSUpportComponent implements OnInit {

  currentLangue = localStorage.getItem("langue");

  heading = 'Les différentes question possible sur le systeme';
  subheading = "Obtener les reponses au question que vous vous posez au quotidien, a l'aide de cette partie";
  icon = 'pe-7s-config icon-gradient bg-premium-dark';

  listFAQ: FaqM[] = [];

  constructor(private serviceFAQ: FaqService) { }

  ngOnInit() {

    this.serviceFAQ.getFaq().subscribe(
        (response)=>{
          console.log(response);
          this.listFAQ = (<FaqM[]>response);
        },
        (error)=>{
          console.log(error);
        }
    )

  }

}
