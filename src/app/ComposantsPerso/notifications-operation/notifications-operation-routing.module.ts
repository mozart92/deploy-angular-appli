import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotificationsOperationComponent} from './notifications-operation.component';



const routes: Routes = [
  {
    path: '',
    component: NotificationsOperationComponent,
    data: {
      title: 'NotificationsOperation'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class NotificationsOperationRoutingModule { }
