import { Component, OnInit } from '@angular/core';
import {AnwserQuestionsService} from '../../../../../Services/anwserQuestions/anwser-questions.service';
// import { faRefresh } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dots',
  templateUrl: './dots.component.html',
})
export class DotsComponent implements OnInit {

  // faRefresh = faRefresh;

  constructor(private seriveDatas : AnwserQuestionsService) { }

  ngOnInit() {
    this.seriveDatas.getHistoriqueDonneeChannel().subscribe(
      (response)=>{
        console.log("reponse pourr voir", response);
      },
      (error)=>{
        console.log(error);
      }
    );
  }

}
