import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ElementsFicheM} from '../../Model/ElementsFicheM';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm, NgModel} from '@angular/forms';
import {ElementsMenu} from '../../Model/ModelContenuSiteWeb/ElementsMenu';
import {MenusM} from '../../Model/ModelContenuSiteWeb/MenusM';
import {CategoriesM} from '../../Model/ModelContenuSiteWeb/CategoriesM';
import {ArticlesM} from '../../Model/ModelContenuSiteWeb/ArticlesM';
import {EchangeDataService} from '../../Services/EchangeData/echange-data.service';
import {MenusService} from '../../Services/ServicesSiteWeb/menus/menus.service';
import {CategoriesService} from '../../Services/ServicesSiteWeb/categories/categories.service';
import {ElementMenuService} from '../../Services/ServicesSiteWeb/elementMenu/element-menu.service';
import {ArticlesService} from '../../Services/ServicesSiteWeb/articles/articles.service';
import {NotificationsGeneralService} from '../../ComposantsPerso/ServiceNotif/notifications-general.service';
import {StatusNotification} from '../../ComposantsPerso/notifications-operation/notifications-operation.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.sass'],
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .dark-modal .modal-content {
      background-color: #292b2c;
      color: white;
    }

    .dark-modal .close {
      color: white;
    }

    .light-blue-backdrop {
      background-color: #5cb3fd;
    }

    .hide {
      display: none !important;
    }

    .show {
      display: block;
    }
  `]
})
export class MenusComponent implements OnInit, OnDestroy {

  heading = 'Gestion des menus';
  subheading = '';
  icon = 'pe-7s-file icon-gradient bg-premium-dark';

  labelTitreFormulaire = 'Enregistrement des données';
  labelButtonSave = 'Enregistrer';

  NomMenuFR = 'Nom menu (FR)';
  NomMenuEN = 'Nom menu (EN)';
  Position = 'Position';
  titreBoutonEdit = 'Modifier';
  titreBoutonDelete = 'Supprimer';
  categories;


  @ViewChild('formMenu') formMenu;
  @ViewChild('alert') alert;
  @ViewChild('alertError') alertError;

  isvisible: boolean = false;
  visibleSpinner = false;
  onTouchFile: boolean = true;

  alertModalSuccess = false;
  alertModalError = false;

  currentPropriete: any;


  nameProprieteChange = 'Bloc catégorie';


  labelTitreTableau = 'Liste des fiches de collectes enregistrées';
  actionFormulaire = 'Enregistrer';
  messageEnregistrement = 'Enregistrement effectué avec succès!';
  erreurEnregistrement = 'Erreur enregistrement! Vérifier doublons ou connexion au serveur';

  valeurlabelNomMenuFR = '';
  valeurlabelNomMenuEN = '';
  valeurlabelPosition = '';
  valeuridMenu;
  valeurMenuCollecteID;


  menu;
  listMenus: Array<MenusM> = [];
  id: number;
  model: any = {};

  public elementsMenu: ElementsMenu[] = [];

  Menu: MenusM;
  contenuMenu: ElementsMenu;

  listCategories: Array<CategoriesM> = [];
  listArticles: Array<ArticlesM> = [];

  listParent: ElementsMenu[] = [];

  currentMenu: MenusM;

  currentElementMenu: ElementsMenu;


  constructor(private serviceMenu: MenusService,
              private serviceElementMenu: ElementMenuService,
              private serviveArticle: ArticlesService,
              private serviceCategories: CategoriesService,
              private route: ActivatedRoute,
              private router: Router,
              private passDataFiche: EchangeDataService,
              private modalService: NgbModal,
              public serviceNotification: NotificationsGeneralService) {
  }

  ngOnInit() {

    let menuInit: MenusM = new MenusM();


    this.serviceNotification.configShowNotif.showLoading.show = true;

    this.serviceMenu.getMenus()
      .subscribe(data => {

        this.listMenus = [];
        const tailleArray = (<MenusM[]>data).length;
        for (let i = 0; i < tailleArray; i++) {
          menuInit = new MenusM(
            data[i].id,
            data[i].nomMenuFR,
            data[i].nomMenuEN,
            data[i].position
          );
          this.listMenus.push(menuInit);
        }

        this.serviceNotification.openToast({
          titre: 'Notification',
          message: 'Chargement des menus réussi!!',
          status: StatusNotification.SUCCESS
        });

        this.passDataFiche.injectDataFichers(this.listMenus);

      }, error => {
        this.serviceNotification.openToast({
          titre: 'Notification',
          message: 'Echec du chargement des menus, vérifier votre connection au serveur',
          status: StatusNotification.ERROR
        });
        console.log(error);
      });

    this.serviceCategories.getCategories()
      .subscribe(data => {
        this.listCategories = (<Array<CategoriesM>>data);
        this.serviceNotification.openToast({
          titre: 'Notification',
          message: 'Chargement des catégories réussi!!',
          status: StatusNotification.SUCCESS
        });

      }, err => {
        this.serviceNotification.openToast({
          titre: 'Notification',
          message: 'Echec du chargement des catégories, vérifier votre connection au serveur',
          status: StatusNotification.ERROR
        });
        console.log(err);
      });


    this.serviveArticle.getArticles()
      .subscribe(data => {
        this.serviceNotification.configShowNotif.showLoading.show = false;
        this.listArticles = (<Array<ArticlesM>>data);
        this.serviceNotification.openToast({
          titre: 'Notification',
          message: 'Chargement des articles réussi!!',
          status: StatusNotification.SUCCESS
        });

      }, err => {
        this.serviceNotification.configShowNotif.showLoading.show = false;
        this.serviceNotification.openToast({
          titre: 'Notification',
          message: 'Echec du chargement des articles, vérifier votre connection au serveur',
          status: StatusNotification.ERROR
        });
        console.log(err);
      });

  }

  ngOnDestroy(): void {}

  onSaveMenu(dataForm) {

    let MenuInitSave: MenusM = new MenusM();

    MenuInitSave = new MenusM(
      null,
      dataForm.labelNomMenuFR,
      dataForm.labelNomMenuEN,
      dataForm.labelPosition
    );
    this.serviceNotification.configShowNotif.showModalBlock = true;

    if (this.actionFormulaire == 'Enregistrer') {

      this.serviceMenu.saveMenu(MenuInitSave)
        .subscribe(data => {
          this.serviceNotification.configShowNotif.showModalBlock = false;
          this.messageEnregistrement = 'Enregistrement fait avec succes!';

          this.serviceNotification.swalSuccess({
            icon: StatusNotification.SUCCESS,
            title: 'Enregistrement éffectué avec succés!!',
            showConfirmButton: true
          });
          this.formMenu.resetForm();
          this.ngOnInit();
        }, error => {
          this.serviceNotification.configShowNotif.showModalBlock = false;
          this.erreurEnregistrement = 'Echec de l\'enregistrement, verifier votre connection au serveur';

          this.serviceNotification.swalError({
            icon: StatusNotification.ERROR,
            title: 'Echec de l\'Opération',
            text: this.erreurEnregistrement
          });
          console.log(error);
        });
    } else if (this.actionFormulaire == 'Modifier') {

      let formatUpdate: MenusM = new MenusM();

      formatUpdate = new MenusM(
        this.valeuridMenu,
        dataForm.labelNomMenuFR,
        dataForm.labelNomMenuEN,
        dataForm.labelPosition
      );

      this.serviceMenu.updateMenu(formatUpdate)
        .subscribe(data => {
          this.serviceNotification.configShowNotif.showModalBlock = false;
          this.messageEnregistrement = 'Modification fait avec succes !!!!!';

          this.serviceNotification.swalSuccess({
            icon: StatusNotification.SUCCESS,
            title: 'Modification éffectué avec succés!!',
            showConfirmButton: true
          });

          this.formMenu.resetForm();
          this.ngOnInit();
          this.labelButtonSave = 'Enregistrer';
          this.actionFormulaire = 'Enregistrer';

        }, error => {
          this.serviceNotification.configShowNotif.showModalBlock = false;
          this.erreurEnregistrement = 'Echec de la modification, verifier votre connection avec le serveur!';
          this.serviceNotification.swalError({
            icon: StatusNotification.ERROR,
            title: 'Echec de l\'Opération',
            text: this.erreurEnregistrement
          });
          console.log(error);

        });
    }
  }


  onSelectFicheCollecte(itemMenu) {

    this.formMenu.resetForm({
      idFicher : itemMenu.id,
      labelNomMenuFR : itemMenu.nomMenuFR,
      labelNomMenuEN : itemMenu.nomMenuEN,
      labelPosition : itemMenu.position
    });

    this.labelButtonSave = 'Modifier';
    this.actionFormulaire = 'Modifier';
    this.valeuridMenu = itemMenu.id;

   /* this.valeurlabelNomMenuFR = itemMenu.nomMenuFR;
    this.valeurlabelNomMenuEN = itemMenu.nomMenuEN;
    this.valeurlabelPosition = itemMenu.position;*/
  }

  onQuitModal(modal) {
    modal.dismiss('Cross click');
    this.elementsMenu = [];
  }


  onChargerElement(idMenu, content) {
    this.valeurMenuCollecteID = idMenu;
    this.currentMenu = this.listMenus.find(element => element.id == idMenu);
    if (this.elementsMenu.length <= 0) {
      this.serviceNotification.configShowNotif.showLoading.text = 'Chargement éléments';
      this.serviceNotification.configShowNotif.showLoading.show = true;
      this.serviceElementMenu.getElementsMenus(idMenu)
        .subscribe(data => {
          this.serviceNotification.configShowNotif.showLoading.show = false;
          let conteElement2: ElementsMenu = new ElementsMenu();
          if ((<ElementsMenu[]>data).length > 0) {
            this.elementsMenu = (<ElementsMenu[]>data);
            this.listParent = (<ElementsMenu[]>data);
          } else {
            this.elementsMenu.push(new ElementsMenu());
          }
          this.serviceNotification.openToast({
            titre: 'Notification',
            message: 'Chargement réussi!!',
            status: StatusNotification.SUCCESS
          });
          this.openXl(content);
        }, error => {
          this.serviceNotification.configShowNotif.showLoading.show = false;
          this.serviceNotification.openToast({
            titre: 'Notification',
            message: 'Echec du Chargement!!',
            status: StatusNotification.ERROR
          });
        });

    } else {
      this.elementsMenu = [];
    }
  }


  addElement(ff: NgForm) {
    let concatem = this.elementsMenu.length - 1;
    const dataForm: ElementsMenu = new ElementsMenu(this.elementsMenu.length,
      ff.value['titreMenuFR_' + concatem],
      ff.value['titreMenuEN_' + concatem],
      ff.value['alia_' + concatem],
      ff.value['typeMenu_' + concatem],
      ff.value['propriete_' + concatem],
      ff.value['parent_' + concatem],
      this.valeurMenuCollecteID
    );

    this.onSaveElements(dataForm);
  }


  removeElement(valElement: ElementsMenu, i) {
    if (valElement.id != null) {

      let {valFornotif, swalWithBootstrapButtons} = this.serviceNotification.swalConfirm({
        title: 'Etes-vous sure de vouloir supprimer cette donnees?',
        icon: StatusNotification.WARNING,
        showCancelButton: true,
        confirmButtonText: 'Oui, supprimer !',
        cancelButtonText: 'Non, annuler!',
        reverseButtons: true
      });
      valFornotif.then((result) => {
        if (result.value) {
          this.serviceNotification.configShowNotif.showLoading.text = 'Suppression en cours';
          this.serviceNotification.configShowNotif.showLoading.show = true;
          this.serviceElementMenu.deleteElementsMenu(valElement).subscribe(
            (reponse) => {
              this.serviceNotification.configShowNotif.showLoading.show = false;
              this.messageEnregistrement = 'suppression effectue avec success!';

              swalWithBootstrapButtons.fire(
                'Suppréssion!',
                this.messageEnregistrement,
                StatusNotification.SUCCESS
              );
              this.elementsMenu = [];
              this.elementsMenu = (<ElementsMenu[]>reponse);
              this.listParent = (<ElementsMenu[]>reponse);
            },
            (error) => {
              this.serviceNotification.configShowNotif.showLoading.show = false;
              this.erreurEnregistrement = 'Echec de la suppression, verifier la connection avec le serveur!';
              swalWithBootstrapButtons.fire(
                'Suppréssion!',
                this.erreurEnregistrement,
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
    } else {
      this.elementsMenu.splice(i, 1);
    }
  }


  onUpdateElement(titreMenuFR, titreMenuEN, objalias, objtypeMenu, objpropriete, objparent, itemelementMenu: ElementsMenu) {

    let formatUpdate: ElementsMenu = new ElementsMenu(
      itemelementMenu.id,
      titreMenuFR.value,
      titreMenuEN.value,
      objalias.value,
      objtypeMenu.value,
      objpropriete,
      objparent.value,
      null,
      itemelementMenu.menu);

    this.serviceNotification.configShowNotif.showLoading.text = 'Modification en cours';
    this.serviceNotification.configShowNotif.showLoading.show = true;
    this.serviceElementMenu.updateElementsMenu(formatUpdate).subscribe(
      (data) => {
        this.serviceNotification.configShowNotif.showLoading.show = false;

        // @ts-ignore
        let response = data.dataReturn;
        // @ts-ignore
        this.alertModalSuccess = true;
        // @ts-ignore
        this.messageEnregistrement = data.message;

        this.elementsMenu = [];
        this.listParent = [];
        this.elementsMenu = (<ElementsMenu[]>response);
        this.listParent = (<ElementsMenu[]>response);
        this.serviceNotification.openToast({
          titre: 'Notification',
          message: 'Modification réussi!!',
          status: StatusNotification.SUCCESS
        });
      },
      (error) => {
        this.serviceNotification.openToast({
          titre: 'Notification',
          message: 'Echec de la Modification!!',
          status: StatusNotification.ERROR
        });
        console.log(error);
      }
    );
  }


  onDeleteFicheCollecte(id: number) {

    let {valFornotif, swalWithBootstrapButtons} = this.serviceNotification.swalConfirm({
      title: 'Etes-vous sure de vouloir supprimer cette donnees?',
      icon: StatusNotification.WARNING,
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer !',
      cancelButtonText: 'Non, annuler!',
      reverseButtons: true
    });
    valFornotif.then((result) => {
      if (result.value) {
        this.serviceNotification.configShowNotif.showLoading.text = 'Suppression en cours';
        this.serviceNotification.configShowNotif.showLoading.show = true;
        this.serviceMenu.deleteMenu(id).subscribe(
          (reponse) => {
            this.serviceNotification.configShowNotif.showLoading.show = false;
            this.messageEnregistrement = 'suppression effectue avec success!';

            swalWithBootstrapButtons.fire(
              'Suppréssion!',
              this.messageEnregistrement,
              StatusNotification.SUCCESS
            );
            this.ngOnInit();
          },
          (error) => {
            this.serviceNotification.configShowNotif.showLoading.show = false;
            this.erreurEnregistrement = 'Echec de la suppression, verifier la connection avec le serveur!';
            swalWithBootstrapButtons.fire(
              'Suppréssion!',
              this.erreurEnregistrement,
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


  onChangeNamepropriete(objTypeChamp: NgModel, itemelementMenu: ElementsMenu) {

    //this.ele

    switch (objTypeChamp.value) {
      case 'Bloc catégorie' :
        this.nameProprieteChange = 'Bloc catégorie';
        break;
      case 'Simple Article' :
        this.nameProprieteChange = 'Simple Article';
        break;
      case 'Bloc des médias':
        this.nameProprieteChange = 'Bloc des médias';
        break;
      case 'Lien divers':
        this.nameProprieteChange = 'Lien divers';
        break;
    }

  }


  onSaveElements(oneElementMenu: ElementsMenu) {

    let cloneElement = [].concat(this.elementsMenu);

    this.serviceNotification.configShowNotif.showLoading.text = 'Enregistrement en cours';
    this.serviceNotification.configShowNotif.showLoading.show = true;
    this.visibleSpinner = true;
    this.serviceElementMenu.saveElementsMenu(oneElementMenu)
      .subscribe(response => {
        this.serviceNotification.configShowNotif.showLoading.show = false;
        // @ts-ignore
        let data = response.dataReturn;

        // @ts-ignore
        if (response.success == true && response.codeStatus == 'SUCCESS_SAVE') {


          let contenuMenu3: ElementsMenu = new ElementsMenu();

          let convert = (<ElementsMenu>data);
          contenuMenu3 = new ElementsMenu(
            convert.id,
            convert.titreMenuFR,
            convert.titreMenuEN,
            convert.alias,
            convert.typeMenu,
            convert.propriete,
            convert.parent,
            convert.menu.id,
            convert.menu
          );


          for (let y = 0; y < cloneElement.length; y++) {
            let indexDelete: number = this.elementsMenu.findIndex(element => element.id == null);
            if (indexDelete != null) {
              cloneElement.splice(indexDelete, 1);
            }
          }

          cloneElement.push(contenuMenu3);
          cloneElement.push(new ElementsFicheM());

          this.listParent = cloneElement;
          this.elementsMenu = cloneElement;

          this.serviceNotification.openToast({
            titre: 'Notification',
            message: 'Enregistrement réussi!!',
            status: StatusNotification.SUCCESS
          });

        }
        this.visibleSpinner = false;

      }, error => {
        this.serviceNotification.configShowNotif.showLoading.show = false;
        this.visibleSpinner = false;

        if (error.error.codeNumber == 108) {
          let elementsMenuNull: ElementsMenu = new ElementsMenu();
          elementsMenuNull.alias = new Date().getTime() + '_' + this.valeurMenuCollecteID;
          this.elementsMenu.push(elementsMenuNull);
        }
        if (error.error.codeNumber == 107) {
          console.log('ERREUR DE CREATION DE L\'ELEMENT');

          this.serviceNotification.openToast({
            titre: 'Notification',
            message: 'Enregistrement échoué!!',
            status: StatusNotification.ERROR
          });
        }
      });
  }

  cancelAction() {
    this.labelButtonSave = 'Enregistrer';
    this.formMenu.resetForm();
  }

  onShowModal(content) {
    this.openXl(content);
  }

  openBackDropCustomClass(content) {
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  }

  openWindowCustomClass(content) {
    this.modalService.open(content, {windowClass: 'dark-modal'});
  }

  openSm(content) {
    this.modalService.open(content, {size: 'sm'});
  }

  openLg(content) {
    this.modalService.open(content, {size: 'lg'});
  }

  openXl(content) {
    // @ts-ignore
    this.modalService.open(content, {size: 'xl'});
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, {centered: true});
  }


}
