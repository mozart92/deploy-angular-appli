import { NgModule } from '@angular/core';
import {FormatTypeInputRoutingModule} from './format-type-input-routing.module';
import {FormatTypeInputPipe} from './format-type-input.pipe';
import {SizeInputFormatModule} from '../../Pipes/sizeInputFormat/size-input-format.module';



@NgModule({
  imports: [
    FormatTypeInputRoutingModule, SizeInputFormatModule
  ],
  declarations: [FormatTypeInputPipe],
  exports: [FormatTypeInputPipe]
})
export class FormatTypeInputModule { }
