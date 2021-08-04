import { Component, OnInit } from '@angular/core';
import {BulletinsService} from '../../Services/Bulletin/bulletins.service';
import {BulletinM} from '../../Model/BulletinM';
import {NotificationsGeneralService} from '../../ComposantsPerso/ServiceNotif/notifications-general.service';
import {StatusNotification} from '../../ComposantsPerso/notifications-operation/notifications-operation.component';
import Swal from "sweetalert2";

@Component({
  selector: 'app-list-bulletins',
  templateUrl: './list-bulletins.component.html',
  styleUrls: ['./list-bulletins.component.sass'],
  styles : [`
    .btn-transition:hover{
      color: white!important;
    }
  `]
})
export class ListBulletinsComponent implements OnInit {

  heading = 'Listes des bulletins d\'informations générés';
  subheading = 'Visualiser, supprimer, diffuser les bulletins d\'informations';
  icon = 'pe-7s-config icon-gradient bg-premium-dark';

  listBulletins : BulletinM[] = [];

  constructor(private serviceBulletin : BulletinsService,
              public serviceNotification : NotificationsGeneralService,
              private servicesBulletins : BulletinsService) { }

  ngOnInit(): void {
    this.initDataBulletin();
  }

  initDataBulletin(){
    this.serviceBulletin.listAllBulletins().subscribe(
      (response)=>{
        console.log(response);
        this.listBulletins = response;
      },
      (error)=>{
        console.log(error);
      }
    )
  }



  onDeleteBulletin(id: number) {

    let  {valFornotif , swalWithBootstrapButtons }  = this.serviceNotification.swalConfirm({
      title: 'Etes-vous sure de vouloir supprimer cette donnees?',
      icon: StatusNotification.WARNING,
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer !',
      cancelButtonText: 'Non, annuler!',
      reverseButtons: true
    });
    valFornotif.then((result) => {
      if (result.value) {
        this.serviceNotification.configShowNotif.showLoading.text = "Suppression en cours";
        this.serviceNotification.configShowNotif.showLoading.show = true;
        this.servicesBulletins.deleteBulletin(id).subscribe(
          (reponse)=>{
            this.serviceNotification.configShowNotif.showLoading.show = false;
            swalWithBootstrapButtons.fire(
              'Suppression!',
              "suppression effectue avec success!",
              StatusNotification.SUCCESS
            );
            this.ngOnInit();
          },
          (error)=>{
            this.serviceNotification.configShowNotif.showLoading.show = false;
            swalWithBootstrapButtons.fire(
              'Suppression!',
              "Echec de la suppression, verifier la connection avec le serveur!",
              StatusNotification.ERROR
            );
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Annulation',
          'Vous venez d\'annuler votre opération de suppression',
          'error'
        );
      }
    });
  }



}
