import {Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
// @ts-ignore
import * as $ from 'jquery';
import {NewPlanification} from '../../../Model/NewPlanification';
import {BaseQuestionnaireM} from '../../../Model/BaseQuestionnaireM';
import {NiveauValidationM} from '../../../Model/NiveauValidationM';
import {BaseQuestionnaireService} from '../../../Services/baseQuestionnaire.service';
import {NewPlannificationService} from '../../../Services/newPlannification/new-plannification.service';
import {RegionService} from '../../../Services/Region/region.service';
import {GroupesService} from '../../../Services/groupe/groupes.service';
import {Utilisateurs} from '../../../Model/utilisateurs';
import {RegionM} from '../../../Model/RegionM';
import {Group} from '../../../Model/group';
import {FormBuilder, FormGroup} from '@angular/forms';
import {IDropdownSettings} from 'ng-multiselect-dropdown/multiselect.model';
import {NotificationsGeneralService} from '../../../ComposantsPerso/ServiceNotif/notifications-general.service';
import Swal from 'sweetalert2';
import {StatusNotification} from '../../../ComposantsPerso/notifications-operation/notifications-operation.component';
import {translateContenufunction} from '../../../ServiceAPI/GeneralAPI';
import {translateExpression} from '@angular/compiler-cli/src/ngtsc/translator';

//declare var $: any;
import {TranslateService} from '@ngx-translate/core';
// @ts-ignore
import defaultLanguage from "../../../../assets/i18n/fr.json";
// @ts-ignore
import LanguageEN from "../../../../assets/i18n/en.json";

interface TypePlanification {
  id;
  libelleGroupe;
}



@Component({
  selector: 'app-niveau-validation',
  templateUrl: './niveau-validation.component.html',
  styleUrls: ['./niveau-validation.component.css'],
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
  `]
})
export class NiveauValidationComponent implements OnInit, OnDestroy {

  icon = 'pe-7s-timer icon-gradient bg-premium-dark';
  currentLangue = localStorage.getItem("langue");

  //ELEMENT A TRADUIRE DE LAPPLICATION

  labelTitreFormulaire = 'Enregistrement des données';
  labelButtonSave = 'Enregistrer';
  actionFormulaire='Enregistrer';
  titreBoutonEdit='Modifier';
  titreBoutonDelete='Supprimer';


  labelTitreTableau = 'Liste des planifications enregistrées';
  labelTitreTableauEN = 'List of saved schedules';

  erreurEnregistrementFR='Erreur enregistrement! Vérifier doublons ou connexion au serveur';
  erreurEnregistrementEN='Registration error! Check duplicates or server connection';

  libellePlanning: String = "Par defaut rien";




  reseiveData = null;
  dataToSend= null;

  isVisible = false;


  @ViewChild('formNivoValidation') formNivoValidation;
  @ViewChild('alert') alert;
  @ViewChild('alertError') alertError;

  isvisibleModal: boolean = false;
  listPlannification: NewPlanification[] = [];
  listBasequestionnaire: BaseQuestionnaireM[] = [];
  listGroupByPlanning: NiveauValidationM[] = [];
  listGroupByPlanningForDetailGeneral: NiveauValidationM[] = [];
  planningCurreent: NewPlanification;



  show:boolean=false;

  regions: RegionM[] = [];

  listGroup: Group[] =[];
  valeurIdval;
  valeurNiveau1:  any[];
  userCurrent = localStorage.getItem("token")


  LIMIT_PARGINATION = 10;
  listForPaginaition: NewPlanification[] = [];
  countItemAffcihe: number = 0;
  page = 1;

  onPlanningForRead : NewPlanification;

  myForm: FormGroup;
  dropdownSettings: IDropdownSettings = {};

  planification: Array<TypePlanification> = [];

  selectPlanningMultiple : TypePlanification[] = [];
  tabIdPlanningSelectMultipl : any[] = [];

  term = '';



  constructor(private serBDQuestionnaire: BaseQuestionnaireService,
              private servicePlanning : NewPlannificationService,
              private serviceregion: RegionService,
              private serviceGroup: GroupesService,
              private modalService: NgbModal,
              private fb: FormBuilder,
              public serviceNotification : NotificationsGeneralService,
              private translate : TranslateService) {
    if (localStorage.getItem("langue")=="fr"){
      this.translate.setTranslation(`${localStorage.getItem("langue")}`, defaultLanguage);
      this.translate.use(`${localStorage.getItem("langue")}`);
    }
    if (localStorage.getItem("langue")=="en"){
      this.translate.setTranslation(`${localStorage.getItem("langue")}`, LanguageEN);
      this.translate.use(`${localStorage.getItem("langue")}`);
    }
  }



  ngOnInit() {
    this.myForm = this.fb.group({
      planification: []
    });
    this.serviceNotification.configShowNotif.showLoading.text = translateContenufunction("Chargement en cours", "Loading in progress");
    this.serviceNotification.configShowNotif.showLoading.show = true;
    this.servicePlanning.getAllplannifications().subscribe(
      (response)=>{
        this.initPlanning(response);

      },
      (error)=>{
        this.serviceNotification.configShowNotif.showLoading.show = false;
        console.log(error)
      }
    );

    this.dropdownSettings = {
      singleSelection: false,
      defaultOpen: false,
      idField: 'id',
      textField: 'libelleGroupe',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableCheckAll: true,
      itemsShowLimit: 4,
      allowSearchFilter: true
    };
    this.initGroupeInPlanning();

  }

  ngOnDestroy(): void {}


  initGroupeInPlanning(){
    this.listGroup = [];
    let formatInitGroup: Group = new Group();
    this.serviceGroup.getGroupFunction().subscribe(
      (response)=>{
        const tailleArray = (<Group[]>response).length;
        for (let i=0; i<tailleArray;i++){
          formatInitGroup = new Group(
            response[i].id,
            response[i].libelleGroupe,
            response[i].abreviation,
            response[i].description,
            response[i].groupesLie,
            response[i].typeGroupes
          );
          this.listGroup.push(formatInitGroup);
          this.planification.push({'id':response[i].id, 'libelleGroupe':response[i].libelleGroupe});
        }
      },
      (error)=>{
        console.log(error)
      }
    );
  }


  listingDataSend(message: any) {
    this.dataToSend = null;
    if (!message.isShow) {
      this.ngOnInit();
    }
  }


  initPlanning(response){
    this.listForPaginaition = [];
    let formaPlanning: NewPlanification = new NewPlanification();
    const tailleArray = (<Utilisateurs[]>response).length;
    for (let i=0; i<tailleArray;i++){
      formaPlanning = new NewPlanification(
        response[i].id,
        response[i].libellePlanning,
        response[i].dateDebut,
        response[i].dateFin,
        response[i].frequence,
        response[i].dateEffictif,
        response[i].typeCloture,
        response[i].observations,
        null,
        response[i].baseQuestionnaires,
        response[i].objectif,
        response[i].programmerPar,
        null,
        null,
        response[i].libellePlanningEN,
        response[i].observationsEN,
        response[i].objectifsEN,
      );
      this.listForPaginaition.push(formaPlanning);
      this.serviceNotification.configShowNotif.showLoading.show = false;
    }
    this.listPlannification = [];
    this.countItemAffcihe = this.listForPaginaition.length;
    this.listPlannification = this.listForPaginaition.slice(0, this.LIMIT_PARGINATION);

  }


  cancelAction(){
    this.labelButtonSave="Enregistrer";
    this.formNivoValidation.resetForm();
  }

  onChargerPlanning(id, libellePlanning){
    this.isVisible = true;
    this.libellePlanning = libellePlanning;
    this.isVisible = false;
    this.valeurIdval = id;
    this.show = !this.show;
    if (this.tabIdPlanningSelectMultipl.length>0){
      this.myForm.get('planification').setValue([]);
    }

  }

  onShowValidation(itemplanning: NewPlanification,content?: TemplateRef<any>){
    this.planningCurreent = itemplanning;
    this.isvisibleModal = true;
    this.servicePlanning.getAllGrroupAssignValided(itemplanning.id).subscribe(
      (response)=>{
        this.listGroupByPlanning = [];
        this.isvisibleModal =  false;
        this.listGroupByPlanning = (<NiveauValidationM[]>response);
      },
      (error)=>{
        this.isvisibleModal =  false;
        console.log(error);
      }
    )
    if (content!=null || content != undefined){
      this.openVerticallyCentered(content);
    }
  }


  onViewDetailPlanning(planning : NewPlanification, content){
    this.onPlanningForRead = planning;
    this.onShowValidationForDetailGeneral(planning, content);

  }

  onShowValidationForDetailGeneral(itemplanning: NewPlanification, content){
    this.listGroupByPlanningForDetailGeneral = [];
    this.servicePlanning.getAllGrroupAssignValided(itemplanning.id).subscribe(
      (response)=>{
        this.listGroupByPlanningForDetailGeneral = (<NiveauValidationM[]>response);
      },
      (error)=>{
        console.log(error);
      }
    )
    this.openXl(content);
  }


  onUpdatePlanning(itemPlanning){
    this.dataToSend = itemPlanning;
    this.reseiveData = itemPlanning;

  }


  onDeletePlanning(id: number, indexTabItem) {

  let  {valFornotif , swalWithBootstrapButtons }  = this.serviceNotification.swalConfirm();
    valFornotif.then((result) => {
      if (result.value) {
        this.serviceNotification.configShowNotif.showLoading.text = translateContenufunction("Suppréssion en cours", "Deleting in progress");
        this.serviceNotification.configShowNotif.showLoading.show = true;
        this.servicePlanning.deletePlannification(id).subscribe(
          (reponse)=>{
            this.serviceNotification.configShowNotif.showLoading.show = false;

            swalWithBootstrapButtons.fire(
              'Deleted!',
              translateContenufunction("Suppression de la planification éffectuée avec succès!", "Successful deletion of the planning process!"),
              StatusNotification.SUCCESS
            );
            this.listPlannification.splice(indexTabItem, 1);
          },
          (error)=>{
            this.serviceNotification.configShowNotif.showLoading.show = false;
            console.log(error.error.codeNumber);
            if (error.error.codeNumber == 202){

              swalWithBootstrapButtons.fire(
                'Deleted!',
                translateContenufunction("Impossible de supprimer cette planification, en cours d'exploitation", "Impossible to delete this planning, exploitation in progress."),
                StatusNotification.ERROR
              );
              throw new Error(this.erreurEnregistrementFR);
            }
            if (error.error.codeNumber == 150){

              swalWithBootstrapButtons.fire(
                'Deleted!',
                translateContenufunction("Impossible de supprimer cette planification, ressource déja utilisée", "Impossible to delete this schedule, resource already used"),
                StatusNotification.ERROR
              );
              throw new Error(this.erreurEnregistrementFR);
            }

            swalWithBootstrapButtons.fire(
              'Deleted!',
              translateContenufunction("Echec de la suppression, une erreur est survenue", "Deletion failed, an error has occurred"),
              StatusNotification.ERROR
            );
          }
        );
      } else if (
        result.dismiss === Swal.DismissReason.cancel
    ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          translateContenufunction('Vous venez d\'annuler votre opération de suppression', 'You have just cancelled your deletion operation'),
          'error'
        );
      }
    })
  }

  onDeteleGrouAssocie(groupe:Group){
    let formatNiveauVal: NiveauValidationM = new NiveauValidationM(groupe, 0,this.planningCurreent);
    this.servicePlanning.desactivatedGroupAttribut(formatNiveauVal).subscribe(
      (response)=>{
        this.onShowValidation(this.planningCurreent);
      },
      (error)=>{
        console.log(error);
      }
    )

  }


  onSendNiveauValidation(datFormNivoValide) {
    this.serviceNotification.configShowNotif.showModalBlock = true;
    this.servicePlanning.SendAllNiveauPlanning({"idProgrammation":datFormNivoValide.idProgrammation, "hieghtNiveau":datFormNivoValide.hieghtNiveau,"niveau1":this.tabIdPlanningSelectMultipl}).subscribe(
      (response) => {
        this.serviceNotification.configShowNotif.showModalBlock = false;

        this.serviceNotification.swalSuccess(
          {title : translateContenufunction("Enregistrement éffectué avec succes!", "Successfully saved!"),
                 icon : StatusNotification.SUCCESS
          });
        this.myForm.get('planification').setValue([]);
        // @ts-ignore
        $('#hieghtNiveau').val(null);
      },
      (error) => {
        console.log(error.error.message);
        this.serviceNotification.configShowNotif.showModalBlock = false;
        this.erreurEnregistrementFR = error.error.message;
        this.erreurEnregistrementEN = error.error.message;
        this.serviceNotification.swalError({title : 'attribuer niveau de remplissage', text : this.erreurEnregistrementFR, icon : StatusNotification.ERROR})
      }
    );
  }


  openXl(content) {
    // @ts-ignore
    this.modalService.open(content, { size: 'xl' });
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }


  onChangePageRecup(dataRecup){
    this.page = dataRecup;
    this.listPlannification = [];
    if (dataRecup==1){
      this.listPlannification = this.listForPaginaition.slice(0, this.LIMIT_PARGINATION);
    }else {
      this.listPlannification = this.listForPaginaition.slice(((dataRecup - 1)*this.LIMIT_PARGINATION), (this.LIMIT_PARGINATION*dataRecup));
    }
  }

  onItemSelect(item: any) {
    this.tabIdPlanningSelectMultipl = [];
    this.selectPlanningMultiple = this.myForm.get('planification').value;
    for (let i = 0; i < (this.myForm.get('planification').value as TypePlanification[]).length; i++){
      this.tabIdPlanningSelectMultipl.push((this.myForm.get('planification').value as TypePlanification[])[i].id);
    }
  }



  onSelectAll(items: any) {
    this.tabIdPlanningSelectMultipl = [];
    this.selectPlanningMultiple = this.myForm.get('planification').value;
    for (let i = 0; i < (this.myForm.get('planification').value as TypePlanification[]).length; i++){
      this.tabIdPlanningSelectMultipl.push((this.myForm.get('planification').value as TypePlanification[])[i].id);
    }
  }

  onDropDownClose() {
    this.tabIdPlanningSelectMultipl = [];
    this.selectPlanningMultiple = (this.myForm.get('planification').value as TypePlanification[]);
    if (this.myForm.get('planification').value!=null){
      for (let i = 0; i < (this.myForm.get('planification').value as TypePlanification[]).length; i++){
        this.tabIdPlanningSelectMultipl.push((this.myForm.get('planification').value as TypePlanification[])[i].id);
      }
    }
  }

  onChangeNbreDatasAffiche(valNbre){
    this.LIMIT_PARGINATION = valNbre;
    this.page = 1;
    this.listPlannification = this.listForPaginaition.slice(0, valNbre);
  }


}
