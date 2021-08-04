import {Component, OnInit, ViewChild} from '@angular/core';
import { ThemeOptions } from '../../../../../theme-options';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { faCloudDownloadAlt } from '@fortawesome/free-solid-svg-icons';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { faTh } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import {CommentairesService} from '../../../../../Services/Commentaire/commentaires.service';
import {CommentairesM} from '../../../../../Model/CommentairesM';



@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styles: [`
    .scroll-area-sm{
      height: 100%;
    }

    .chat-box-perso{
      background-color: #59bdd8!important;
      color: white;
    }
  `]
})
export class DrawerComponent implements OnInit {

  faFile = faFile;
  faCloudDownloadAlt = faCloudDownloadAlt;
  faFilePdf = faFilePdf;
  faFileExcel =faFileExcel;
  faCheck = faCheck;
  faTrash = faTrash;
  faEllipsisH = faEllipsisH;
  faTh = faTh;
  faCalendarAlt = faCalendarAlt;


  listCommentaires : CommentairesM[] = [];
  currentUser = localStorage.getItem("token");

  @ViewChild("objForm") element_commentaire;



  toggleDrawer() {
    this.listCommentaires = this.globals.listCommentaireServiceGeneral;
    if (this.listCommentaires.length > 0 && this.globals.listCommentaireServiceGeneral.length > 0){
      this.globals.toggleDrawer = !this.globals.toggleDrawer;
    }

    if (this.listCommentaires.length == 0 && this.globals.listCommentaireServiceGeneral.length == 0){
      this.globals.toggleDrawer = !this.globals.toggleDrawer;
    }
  }

  constructor(public globals: ThemeOptions,
              public serviceCommentaires : CommentairesService) {
  }

  ngOnInit() {}

  onSendCommentaire(valCommentaire){
    let formatCommentaireForSend: CommentairesM = new CommentairesM(null,
                                                                       valCommentaire,
                                                                        new Date(),
                                                                        null,
                                                                       null,
                                                                        false,
                                                                       this.globals.idDataForCommentaire,
                                                                        localStorage.getItem("token"));

    this.serviceCommentaires.sendCommentaires(formatCommentaireForSend).subscribe(
      (response)=>{
        console.log(response);
        let itemCommentaire : CommentairesM = ( response as CommentairesM);

        let itemFormat : CommentairesM = new CommentairesM(itemCommentaire.id,
                                                            itemCommentaire.contenu,
                                                            itemCommentaire.dateEnvoi,
                                                            itemCommentaire.dateUpdate,
                                                            itemCommentaire.initiateur,
                                                            itemCommentaire.lu,
                                                            null,
                                                            null,
                                                            itemCommentaire.participants);

        this.listCommentaires.push(itemFormat)

        this.element_commentaire.resetForm();
      },
      (error)=>{
        console.log(error);
      }
    )


  }


}
