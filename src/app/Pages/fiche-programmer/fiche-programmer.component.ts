import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {ElementFicheService} from '../../Services/elementFiche.service';
import {ElementsFicheM} from '../../Model/ElementsFicheM';
import {AnwserQuestionsService} from '../../Services/anwserQuestions/anwser-questions.service';
import {AnwserQuestions} from '../../Model/anwserQuestions';
import {DepartementM} from '../../Model/departementM';
import {RegionM} from '../../Model/RegionM';
import {CommuneM} from '../../Model/CommuneM';
import {RegionService} from '../../Services/Region/region.service';
import {DepartementService} from '../../Services/Departement/departement.service';
import {CommuneService} from '../../Services/Commune/commune.service';
import {LaboratoiresM} from '../../Model/LaboratoiresM';
import {EspecesM} from '../../Model/EspecesM';
import {PathologiesM} from '../../Model/PathologiesM';
import {NaturePrelevementM} from '../../Model/NaturePrelevementM';
import {AnalyseLaboratoireM} from '../../Model/AnalyseLaboratoireM';
import {MaladiesM} from '../../Model/MaladiesM';
import {OIEM} from '../../Model/OIEM';
import {SourceContaminationM} from '../../Model/SourceContaminationM';
import {MesuresControleM} from '../../Model/MesuresControleM';
import {TypeVaccinM} from '../../Model/TypeVaccinM';
import {TypeProductionM} from '../../Model/TypeProductionM';
import {SystemProductionM} from '../../Model/SystemProductionM';
import {LaboratoiresService} from '../../Services/Laboratoires/laboratoires.service';
import {EspecesService} from '../../Services/Especes/especes.service';
import {PathologiesService} from '../../Services/Pathologies/pathologies.service';
import {NaturePrelevementService} from '../../Services/NaturePrelevement/nature-prelevement.service';
import {AnalyseLaboratoireService} from '../../Services/AnalyseLaboratoire/analyse-laboratoire.service';
import {MaladiesService} from '../../Services/Maladies/maladies.service';
import {OIEService} from '../../Services/OIE/oie.service';
import {SourceContaminationService} from '../../Services/SourceContamination/source-contamination.service';
import {MesuresControleService} from '../../Services/MesuresControle/mesures-controle.service';
import {TypeVaccinService} from '../../Services/TypeVaccin/type-vaccin.service';
import {TypeProductionService} from '../../Services/TypeProduction/type-production.service';
import {SystemProductionService} from '../../Services/SystemProduction/system-production.service';
import {CzvsService} from '../../Services/czvs/czvs.service';
import {CzvsModel} from '../../Model/CzvsModel';
import {VillagesService} from '../../Services/Villages/villages.service';
import {VillagesM} from '../../Model/VillagesM';
import {ModeProductionService} from '../../PlatesFormes/mode-production.service';
import {NotificationsGeneralService} from '../../ComposantsPerso/ServiceNotif/notifications-general.service';
import {StatusNotification} from '../../ComposantsPerso/notifications-operation/notifications-operation.component';
import {HttpClient, HttpEventType, HttpHeaders, HttpParams, HttpRequest, HttpResponse} from '@angular/common/http';
import {FileUploader} from 'ng2-file-upload';
import {Observable} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {API_USE} from '../../ServiceAPI/GeneralAPI';
import Swal from "sweetalert2";


@Component({
  selector: 'app-fiche-programmer',
  templateUrl: './fiche-programmer.component.html',
  styleUrls: ['./fiche-programmer.component.css'],
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
export class FicheProgrammerComponent implements OnInit, OnDestroy {

  link: string = API_USE + '/uploader-file';

  currentUser = localStorage.getItem('nameUserCurrent');
  currentDate = new Date().getMonth() + '/' + new Date().getDay() + '/' + new Date().getFullYear();
  currentLangue = localStorage.getItem("langue");


  nomOfFiche: String;
  heading;
  subheading = '';
  icon = 'pe-7s-config icon-gradient bg-premium-dark';

  idPlanning: any;

  @ViewChild('formProgramm') formProgramm;
  @ViewChild('alert') alert;
  @ViewChild('alertError') alertError;
  @Input() idFicheInput = null;
  @Input() nomFicheInput = null;
  @Output() isReturn = new EventEmitter();

  uploadForm: FormGroup;



  valeurRegion = '';
  valeurDepartement = '';
  valeurCommune = '';
  valeurCZV = '';
  valeurVillage = '';


  labelTitreFormulaire = 'Enregistrement des données';
  labelButtonSave = 'Enregistrer';
  labelTitreTableau = 'Liste des régions enregistrés';
  actionFormulaire = 'Enregistrer';
  titreBoutonEdit = 'Modifier';
  titreBoutonDelete = 'Supprimer';
  messageEnregistrement = 'Enregistrement effectué avec succès!';
  erreurEnregistrement = 'Erreur enregistrement! Vérifier doublons ou connexion au serveur';


  listDepartement: DepartementM[];
  listDepartementForTries: DepartementM[];
  listRegions: RegionM[];
  listCommunes: CommuneM[];
  listCommunesForTrie: CommuneM[];


  listElements: ElementsFicheM[];
  nameFile = '';
  iDFile;

  currentRegion = localStorage.getItem('region')=="null" || localStorage.getItem('region')=="undefined" ? null : localStorage.getItem('region');
  currentDepartement = localStorage.getItem('departement')=="null" || localStorage.getItem('departement')=="undefined" ? null : localStorage.getItem('departement');
  currentCommune = localStorage.getItem('commune')=="null" || localStorage.getItem('commune')=="undefined" ? null : localStorage.getItem('commune');
  currentCZV = localStorage.getItem('czvUser')=="null" || localStorage.getItem('czvUser')=="undefined" ? null : localStorage.getItem('czvUser');


  //liste des type pametreges
  listLaboratoires: LaboratoiresM[] = [];
  listEspeces: EspecesM[] = [];
  listPathologies: PathologiesM[] = [];
  listNaturePrelevement: NaturePrelevementM[] = [];
  listTypeAnalyse: AnalyseLaboratoireM[] = [];
  listMaladies: MaladiesM[] = [];
  listOIE: OIEM[] = [];
  listSourceContamination: SourceContaminationM[] = [];
  listMesureControle: MesuresControleM[] = [];
  listTypeVaccin: TypeVaccinM[] = [];
  listTypeProduction: TypeProductionM[] = [];
  listSystemProduction: SystemProductionM[] = [];


  listCZV: CzvsModel[] = [];
  listCZVFinal: CzvsModel[] = [];


  listVillage: VillagesM[] = [];
  listVillageFinal: VillagesM[] = [];

  isvisible = false;

  nbreSizeInputForMode: string = '4';


   uploader:FileUploader = new FileUploader({
    isHTML5: true,
     url : ''
  });

  title: string = 'Angular File Upload';

  images = [];

  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])

  });
  returnDataSave : AnwserQuestions;
  arrayFilelist = [];
  isFileAttache = false;

  @ViewChild('content') content;


  constructor(private activateRoute: ActivatedRoute,
              private serviceElementFiche: ElementFicheService,
              private serviceAnwserQuestion: AnwserQuestionsService,
              private serviceRegion: RegionService,
              private serviceDepartement: DepartementService,
              private serviceCommune: CommuneService,
              private serviceLaoratire: LaboratoiresService,
              private serviceEspeces: EspecesService,
              private servicePathologie: PathologiesService,
              private serviceNaturePrelevement: NaturePrelevementService,
              private serviceTypeAnalyse: AnalyseLaboratoireService,
              private serviceMaladies: MaladiesService,
              private serviceOIE: OIEService,
              private serviceSourceContamination: SourceContaminationService,
              private serviceMesureControle: MesuresControleService,
              private serviceTypeVaccin: TypeVaccinService,
              private serviceTypeProduction: TypeProductionService,
              private serviceSystemProducion: SystemProductionService,
              private serviceCZV: CzvsService,
              private serviceVillage: VillagesService,
              public modeApply : ModeProductionService,
              public serviceNotification : NotificationsGeneralService,
              private fb: FormBuilder,
              private http: HttpClient,
              public modalService: NgbModal) {
  }

  ngOnInit() {


    this.serviceNotification.configShowNotif.showLoading.text = "Chargement Eléments";
    this.serviceNotification.configShowNotif.showLoading.show = true;
    this.chargeRegions();
    this.activateRoute.params.subscribe(
      (param) => {
        if (this.idFicheInput != null) {
          this.getAllElementOfFiche(this.idFicheInput);
          this.heading = 'Previsualisation de la fiche :  ' + this.nomFicheInput;
        }
        if (param.idFichier != null || param.idFichier != undefined) {
          this.nameFile = '';
          this.iDFile = (param.idFichier as string).split('#')[0];
          this.idPlanning = (param.idFichier as string).split('#')[1];
          this.nameFile = param.nomFichier;
          this.getAllElementOfFiche(param.idFichier);
          this.heading = 'Enregistrement des données pour la fiche :  ' + this.nameFile;
        }

      }
    )

    this.chargeArrondissement();
    this.chargeDepartement();
    this.chargeCZV();
    this.chargeVillage();
    this.chargeEspeces();
    this.chargeLaboratoires();
    this.chargeMaladies();
    this.chargeMesureControle();
    this.chargeNaturePrelevement();
    this.chargeOIE();
    this.chargePathologies();
    this.chargeSourceContamination();
    this.chargeSystemeProduction();
    this.chargeTypeAnalyse();
    this.chargeTypeProduction();
    this.chargeTypeVaccin();

  }

  ngOnDestroy(): void {}


  uploadSubmit() {
    console.log("toute les fiches : ", this.arrayFilelist);
    if (this.arrayFilelist.length > 0) {
      for (let i = 0; i < this.arrayFilelist.length; i++) {
        let data = new FormData();
        let fileItem = this.arrayFilelist[i];
        data.append('file', fileItem);
        data.append('idDataSave', this.returnDataSave.id.toString());
        let reqHeader = new HttpHeaders({
          'Authorization': localStorage.getItem("tokenType")+" "+localStorage.getItem("accessToken"),
          'User_Connect' : localStorage.getItem("token")
        });


        const req = new HttpRequest('POST', this.link, data, {
          reportProgress: true,
          responseType: 'json',
          headers: reqHeader
        });


        this.http.request(req).subscribe(
        (event) => {
          this.images.splice(i, 1);
          this.serviceNotification.openToast({titre : "Notification", message : `${fileItem.name} : enregistrer avec succés`, status : StatusNotification.SUCCESS});
        },
        (error) => {
          this.serviceNotification.openToast({titre : "Notification", message : `${fileItem.name} : erreur de téléchargement`, status : StatusNotification.ERROR});
          console.log(error);
        });
      }
    }
  }

  onFileChange(event) {
    this.arrayFilelist = Array.from(event.target.files);
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        reader.onload = (event:any) => {
          this.images.push(event.target.result);
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
    console.log("tableau images deburg : ", this.images);
    console.log("debburg table brute file : ", this.arrayFilelist);
  }

  onDeleteImageFile(index){
    this.arrayFilelist.splice(index, 1);
    this.images.splice(index, 1);
  }


  onReturnSaveData(){
    this.returnDataSave = undefined;
    this.formProgramm.resetForm({
      Region : this.currentRegion || this.valeurRegion,
      Departement : this.currentDepartement || this.valeurDepartement,
      Commune : this.currentCommune || this.valeurCommune,
      CZV : this.currentCZV || this.valeurCZV,
      Village : this.valeurVillage
    });
  }


  chargeCZV() {
    this.serviceCZV.getCZVS().subscribe(
      (responce) => {
        this.listCZV = (<CzvsModel[]>responce);
      },
      (error) => {
        console.log(error)
      }
    )
  }

  chargeVillage() {
    this.serviceVillage.getVillage().subscribe(
      (responce) => {
        this.listVillage = (<VillagesM[]>responce);
      },
      (error) => {
        console.log(error)
      }
    )
  }


  chargeLaboratoires() {
    this.serviceLaoratire.getLaboratoire().subscribe(
      (responce) => {
        this.listLaboratoires = (<LaboratoiresM[]>responce);
      },
      (error) => {
        console.log(error)
      }
    )
  }

  chargeEspeces() {
    this.serviceEspeces.getEspece().subscribe(
      (responce) => {
        this.listEspeces = (<EspecesM[]>responce);
      },
      (error) => {
        console.log(error)
      }
    )
  }

  chargePathologies() {
    this.servicePathologie.getPathologie().subscribe(
      (responce) => {
        this.listPathologies = (<PathologiesM[]>responce);
      },
      (error) => {
        console.log(error)
      }
    )
  }

  chargeNaturePrelevement() {
    this.serviceNaturePrelevement.getNaturePrelevement().subscribe(
      (responce) => {
        this.listNaturePrelevement = (<NaturePrelevementM[]>responce);
      },
      (error) => {
        console.log(error)
      }
    )
  }

  chargeTypeAnalyse() {
    this.serviceTypeAnalyse.getAnalyseLaboratoire().subscribe(
      (responce) => {
        this.listTypeAnalyse = (<AnalyseLaboratoireM[]>responce);
      },
      (error) => {
        console.log(error)
      }
    )
  }

  chargeMaladies() {
    this.serviceMaladies.getMaladie().subscribe(
      (responce) => {

        this.listMaladies = (<MaladiesM[]>responce);
      },
      (error) => {
        console.log(error)
      }
    )
  }

  chargeOIE() {
    this.serviceOIE.getOIE().subscribe(
      (responce) => {
        this.listOIE = (<OIEM[]>responce);

      },
      (error) => {
        console.log(error)
      }
    )
  }

  chargeSourceContamination() {
    this.serviceSourceContamination.getSourceContamination().subscribe(
      (responce) => {
        this.listSourceContamination = (<SourceContaminationM[]>responce);
      },
      (error) => {
        console.log(error)
      }
    )
  }

  chargeMesureControle() {
    this.serviceMesureControle.getMesuresControle().subscribe(
      (responce) => {
        this.listMesureControle = (<MesuresControleM[]>responce);
      },
      (error) => {
        console.log(error)
      }
    )
  }

  chargeTypeVaccin() {
    this.serviceTypeAnalyse.getAnalyseLaboratoire().subscribe(
      (responce) => {
        this.listTypeVaccin = (<TypeVaccinM[]>responce);
        this.serviceNotification.configShowNotif.showLoading.show = false;
        if (this.idPlanning != null || this.idPlanning != undefined) {
          this.serviceNotification.swalInfo({
            html : "Veuillez remplir les champs obligations pour permettre l'envoi de votre donnée ",
            title: 'Alert info',
            icon: StatusNotification.INFO,
            showCloseButton: true,
            showCancelButton: false,
            focusConfirm: false,
            confirmButtonText: '<i class="fa fa-thumbs-up"></i> Bien reçu!',
          });
        }
      },
      (error) => {
        console.log(error)
      }
    )
  }

  chargeTypeProduction() {
    this.serviceTypeProduction.getTypeProduction().subscribe(
      (responce) => {
        this.listTypeProduction = (<TypeProductionM[]>responce);
      },
      (error) => {
        console.log(error)
      }
    )
  }

  chargeSystemeProduction() {
    this.serviceSystemProducion.getSystemProduction().subscribe(
      (responce) => {
        this.listSystemProduction = (<SystemProductionM[]>responce);
      },
      (error) => {
        console.log(error)
      }
    )
  }


  getAllElementOfFiche(idSelectionFiche) {
    this.serviceElementFiche.getElementFicheID(idSelectionFiche).subscribe(
      (data) => {
        let elementInit: ElementsFicheM = new ElementsFicheM();
        let tempElement: ElementsFicheM[] = [];
        const tailleArray = (<ElementsFicheM[]>data).length;
        for (let i = 0; i < tailleArray; i++) {
          elementInit = new ElementsFicheM(
            data[i].id,
            data[i].labelChamp,
            data[i].labelChampEN,
            data[i].alias,
            data[i].typeChamp,
            data[i].cadreAffichage,
            data[i].propriete,
            data[i].ficheElementID,
            data[i].ficheCollecte
          );
          tempElement.push(elementInit);
          if (elementInit.typeChamp =="file"){
            this.isFileAttache = true;
          }
        }

        this.listElements = tempElement;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  onSaveContenuImpro(formProgramm: NgForm) {
    this.serviceNotification.configShowNotif.showModalBlock = true;
    let formatSave: AnwserQuestions = new AnwserQuestions(null, JSON.stringify(formProgramm.value), localStorage.getItem('token'), this.iDFile, this.idPlanning);
    this.serviceAnwserQuestion.saveAnwserQuestion(formatSave).subscribe(
      (reponse) => {
        this.uploadForm = this.fb.group({
          document: [null, null],
          type:  [null, Validators.compose([Validators.required])]
        });
        this.returnDataSave = (reponse as AnwserQuestions);
        this.serviceNotification.configShowNotif.showModalBlock = false;
        this.serviceNotification.swalSuccess({
          icon: StatusNotification.SUCCESS,
          title: "Enregistrement éffectué avec succés!!",
          showConfirmButton: true});

        this.formProgramm.resetForm({
          Region : this.currentRegion || this.valeurRegion,
          Departement : this.currentDepartement || this.valeurDepartement,
          Commune : this.currentCommune || this.valeurCommune,
          CZV : this.currentCZV || this.valeurCZV,
          Village : this.valeurVillage
        });
        this.serviceAnwserQuestion.nbreNotificationDonneRempli();

        let initVal = {
          title: 'Succés de l\'enregistrement de votre donnée',
          text : 'Voulez-vous joindre des images à cette fiche ?',
          icon: StatusNotification.SUCCESS,
          showCancelButton: true,
          confirmButtonText: "<i class='bi bi-paperclip'></i>Joindre images",
          cancelButtonText: 'ignoré',
          reverseButtons: false,
        }

        let  {valFornotif , swalWithBootstrapButtons }  = this.serviceNotification.swalConfirm(initVal);
        valFornotif.then((result) => {
          if (result.value) {
              this.openXl(this.content);
          } else if (result.dismiss === Swal.DismissReason.cancel) {
           /* swalWithBootstrapButtons.fire(
              'Cancelled',
              'Vous venez d\'annuler votre opération de suppression',
              'error'
            );*/
          }
        });

      },
      (error) => {
        this.serviceNotification.configShowNotif.showModalBlock = false;
        this.erreurEnregistrement = 'Echec de l\'enregistrement, verifier votre connection au serveur';
       this.serviceNotification.swalError(
         {icon: StatusNotification.ERROR,
         title: "Echec de l'Opération",
         text: 'Echec de l\'enregistrement, verifier votre connection au serveur',
         footer: "" });
        console.log(error);
      }
    )

  }


  closeAlert() {
    this.alert.nativeElement.classList.remove('show');
    this.alert.nativeElement.classList.add('hide');
  }

  closeAlertError() {
    this.alertError.nativeElement.classList.remove('show');
    this.alertError.nativeElement.classList.add('hide');
  }


  chargeRegions() {
    this.serviceRegion.getRegions().subscribe(
      (reponse) => {

        this.listRegions = (<RegionM[]>reponse);
      },
      (error) => {
        console.log(error)
      }
    )
  }

  chargeDepartement() {
    this.serviceDepartement.getDepartements().subscribe(
      (reponse) => {
        this.listDepartementForTries = (<DepartementM[]>reponse);
        this.listDepartement = (<DepartementM[]>reponse);
      },
      (error) => {
        console.log(error)
      }
    )
  }

  chargeArrondissement() {
    this.serviceCommune.getCommunes().subscribe(
      (reponse) => {
        this.listCommunesForTrie = (<CommuneM[]>reponse);
        this.listCommunes = (<CommuneM[]>reponse);
      },
      (error) => {
        console.log(error)
      }
    )
  }

  checkValueCommune(idCommune) {
    this.valeurCommune = this.listCommunes.find(element => element.id == idCommune).libelleCommuneFR;
    let tabCzv: CzvsModel[] = [];
    for (let itemCsv of this.listCZV) {
      if (itemCsv.arrondissement.id == idCommune) {
        tabCzv.push(itemCsv);
      }
    }
    this.listCZVFinal = tabCzv;
  }


  chooseDepartemen(idRegions) {

    this.valeurRegion = this.listRegions.find(element => element.id == idRegions).libelleRegionFR;
    this.serviceRegion.getAllDepartementByIdRegion(idRegions).subscribe(
      (reponse) => {
        this.listDepartement = (<DepartementM[]>reponse);
      },
      (error) => {
        console.log(error)
      }
    )
  }


  chooseCommune(idDepartement) {

    this.valeurDepartement = this.listDepartement.find(element => element.id == idDepartement).libelleDepartementFR;

    this.serviceDepartement.getAllCommuneByIdDepartement(idDepartement).subscribe(
      (reponse) => {
        this.listCommunes = [];
        this.listCommunes = (<CommuneM[]>reponse);
      },
      (error) => {
        console.log(error)
      }
    )
  }


  checkValueobjCZV(idCZV) {
    this.valeurCZV = this.listCZV.find(element => element.id == idCZV).libelleCZVSFR;
    let tabVillage: VillagesM[] = [];
    for (let itemVillage of this.listVillage) {
      if (itemVillage.czvsModel.id == idCZV) {
        tabVillage.push(itemVillage);
      }
    }
    this.listVillageFinal = tabVillage;
  }

  checkValueobjVillage(village) {
    this.valeurVillage = village;
  }

  onRetourne() {
    this.idFicheInput = null;
    this.isReturn.emit(
      {isreturn: true}
    )
  }

  openXl(content) {
    // @ts-ignore
    this.modalService.open(content, {size: 'xl'});
  }


}
