import { NgModule } from '@angular/core';
import {SizeInputFormatPipe} from './size-input-format.pipe';
import {SizeInputFormatRoutingModule} from './size-input-format-routing.module';



@NgModule({
  imports: [
    SizeInputFormatRoutingModule
  ],
  declarations: [SizeInputFormatPipe],
  exports: [SizeInputFormatPipe]
})
export class SizeInputFormatModule { }
