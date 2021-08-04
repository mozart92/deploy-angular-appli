import { NgModule } from '@angular/core';
import {FormatTextToolLongPipe} from './format-text-tool-long.pipe';
import {FormatTextTooLongRoutingModule} from './format-text-too-long-routing.module';



@NgModule({
  imports: [
    FormatTextTooLongRoutingModule
  ],
  declarations: [FormatTextToolLongPipe],
  exports: [FormatTextToolLongPipe]
})
export class FormatTextTooLongModule { }
