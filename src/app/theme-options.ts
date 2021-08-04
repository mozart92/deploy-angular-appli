import { Injectable } from '@angular/core';
import {CommentairesService} from './Services/Commentaire/commentaires.service';
import {CommentairesM} from './Model/CommentairesM';
import {DrawerComponent} from './Layout/Components/header/elements/drawer/drawer.component';

@Injectable()
export class ThemeOptions {
  sidebarHover = false;
  toggleSidebar = false;
  toggleSidebarMobile = false;
  toggleHeaderMobile = false;
  toggleThemeOptions = false;
  toggleDrawer = false;
  toggleFixedFooter = false;
  idDataForCommentaire : number;
  listCommentaireServiceGeneral : CommentairesM[] = [];
  isMasquerCommentaire = false;

  constructor(public serviceComment : CommentairesService) {}

  public getAllCommentaireServiceGeneral(id : number){
    this.serviceComment.getAllCommentaireByData(id).subscribe(
      (response)=>{
        console.log(response);
        this.listCommentaireServiceGeneral = (response as CommentairesM[]);
        this.toggleDrawer = !this.toggleDrawer;
      },
      (error)=>{
        console.log(error);
      }
    )
  }

}
