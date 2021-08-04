import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NouveauQuestionnaireComponent} from './nouveau-questionnaire.component';



const routes: Routes = [
  {
    path: '',
    component: NouveauQuestionnaireComponent,
    data: {
      title: 'NouveauQuestionnaire'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NouveauQuestionnaireRoutingModule { }
