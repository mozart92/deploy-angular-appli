import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateContenuPipe} from './translate-contenu.pipe';
import {TranslateContenuRoutingModule} from './translate-contenu-routing.module';



@NgModule({
  exports : [TranslateContenuPipe],
  declarations: [TranslateContenuPipe],
  imports: [
    TranslateContenuRoutingModule
  ]
})
export class TranslateContenuModule { }
