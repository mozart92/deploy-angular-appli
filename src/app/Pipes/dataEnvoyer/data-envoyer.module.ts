import { NgModule } from '@angular/core';
import {PageTitleComponent} from '../../Layout/Components/page-title/page-title.component';
import {DataEnvoyerRoutingModule} from './data-envoyer-routing.module';
import {DataEnvoyerComponent} from '../../Pages/Planifications/data-envoyer/data-envoyer.component';



@NgModule({
  imports: [
    DataEnvoyerRoutingModule
  ],
  declarations: [DataEnvoyerComponent],
  exports: [DataEnvoyerComponent]
})
export class DataEnvoyerModule { }
