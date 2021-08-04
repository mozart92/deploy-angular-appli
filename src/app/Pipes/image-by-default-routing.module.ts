import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FormatTextToolLongPipe} from './formatTextTooLong/format-text-tool-long.pipe';
import {ImageByDefaultPipe} from './image-by-default.pipe';



const routes: Routes = [
  {
    path: '',
    component: ImageByDefaultPipe,
    data: {
      title: 'ImageByDefault'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImageByDefaultRoutingModule { }
