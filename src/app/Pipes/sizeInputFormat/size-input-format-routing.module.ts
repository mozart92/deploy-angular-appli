import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {NomCardreDefaultPipe} from '../nom-cardre-default.pipe';
import {SizeInputFormatPipe} from './size-input-format.pipe';



const routes: Routes = [
  {
    path: '',
    component: SizeInputFormatPipe,
    data: {
      title: 'SizeInputFormat'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SizeInputFormatRoutingModule { }
