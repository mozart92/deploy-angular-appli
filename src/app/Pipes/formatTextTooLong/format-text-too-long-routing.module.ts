import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormatTextToolLongPipe} from './format-text-tool-long.pipe';



const routes: Routes = [
  {
    path: '',
    component: FormatTextToolLongPipe,
    data: {
      title: 'FormatTextToolLong'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormatTextTooLongRoutingModule { }
