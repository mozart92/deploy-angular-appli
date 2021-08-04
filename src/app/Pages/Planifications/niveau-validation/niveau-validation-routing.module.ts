import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NiveauValidationComponent} from './niveau-validation.component';



const routes: Routes = [
  {
    path: '',
    component: NiveauValidationComponent,
    data: {
      title: 'NiveauValidation'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NiveauValidationRoutingModule { }
