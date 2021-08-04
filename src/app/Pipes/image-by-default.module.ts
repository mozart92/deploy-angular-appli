import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormatTextTooLongRoutingModule} from './formatTextTooLong/format-text-too-long-routing.module';
import {FormatTextToolLongPipe} from './formatTextTooLong/format-text-tool-long.pipe';
import {ImageByDefaultRoutingModule} from './image-by-default-routing.module';
import {ImageByDefaultPipe} from './image-by-default.pipe';



@NgModule({
  imports: [
    ImageByDefaultRoutingModule
  ],
  declarations: [ImageByDefaultPipe],
  exports: [ImageByDefaultPipe]
})
export class ImageByDefaultModule { }
