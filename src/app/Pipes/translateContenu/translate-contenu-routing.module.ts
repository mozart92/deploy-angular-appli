import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FormatTextToolLongPipe} from '../formatTextTooLong/format-text-tool-long.pipe';
import {TranslateContenuPipe} from './translate-contenu.pipe';



const routes: Routes = [
  {
    path: '',
    component: TranslateContenuPipe,
    data: {
      title: 'TranslateContenu'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TranslateContenuRoutingModule { }
