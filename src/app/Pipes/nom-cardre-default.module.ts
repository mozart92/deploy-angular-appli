import { NgModule } from '@angular/core';
import {NomCardreDefaultRoutingModule} from './nom-cardre-default-routing.module';
import {NomCardreDefaultPipe} from './nom-cardre-default.pipe';


@NgModule({
  imports: [
    NomCardreDefaultRoutingModule
  ],
  declarations: [NomCardreDefaultPipe],
  exports: [NomCardreDefaultPipe]
})
export class NomCardreDefaultModule { }
