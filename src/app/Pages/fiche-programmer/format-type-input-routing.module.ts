import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormatTypeInputPipe} from './format-type-input.pipe';


const routes: Routes = [
  {
    path: '',
    component: FormatTypeInputPipe,
    data: {
      title: 'FormatTypeInput'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormatTypeInputRoutingModule { }
