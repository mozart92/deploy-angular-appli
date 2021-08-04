import {Injectable} from '@angular/core';
import {
  ParametreSwalError,
  ParametreSwalInfo,
  ParametreSwalSucces,
  ParamettreSwalConfirm,
  StatusNotification,
  TypeConfigNotification,
  TypeToast
} from '../notifications-operation/notifications-operation.component';
import Swal, {SweetAlertResult} from 'sweetalert2';
import {GlobalConfig, ToastrService} from 'ngx-toastr';
import {API_USE} from '../../ServiceAPI/GeneralAPI';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationsGeneralService {


  options: GlobalConfig;
  link = API_USE;

  constructor(public toastr: ToastrService) {
    this.options = this.toastr.toastrConfig;
  }

  configShowNotif : TypeConfigNotification = {showModalBlock : false,
                        showLoading : {show : false, text : "Chargement des données"}};

  configToast : TypeToast = {titre : "Notification", message : "", status : StatusNotification.SUCCESS};

  changeState : number;
  private lastInserted: number[] = [];

  initParametreShalConfirm : ParamettreSwalConfirm = {
    title: 'Are you sure?',
    text: 'You wont be able to revert this!',
    icon: StatusNotification.WARNING,
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true}



  activeChangeState(){
    this.changeState = Math.random();
  }


  swalConfirm(param?: ParamettreSwalConfirm) : {valFornotif : Promise<SweetAlertResult<any>>, swalWithBootstrapButtons : any} {

    const valeurInitialisationFinale = param || this.initParametreShalConfirm;
    const swalWithBootstrapButtons  = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

   let valFornotif =   swalWithBootstrapButtons.fire(valeurInitialisationFinale);

   return {valFornotif : valFornotif, swalWithBootstrapButtons : swalWithBootstrapButtons}

  }

  swalSuccess(param : ParametreSwalSucces  = {
                //position: 'top-end',
                icon: StatusNotification.SUCCESS,
                title: "Enregistrement éffectué avec succés!!",
                showConfirmButton: true,
                timer: 5000})
  {
    console.log(param);
    Swal.fire(param);
  }


  swalInfo(param : ParametreSwalInfo  = {
    title: 'Alert info',
    icon: StatusNotification.INFO,
    html: 'You can use <b>bold text</b> ',
    showCloseButton: true,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText: '<i class="fa fa-thumbs-up"></i> Bien reçu!',
    confirmButtonAriaLabel: 'Thumbs up, great!',
    cancelButtonText: '<i class="fa fa-thumbs-down" style="text-align: center"></i>',
    cancelButtonAriaLabel: 'Thumbs down'
  })
  {
    console.log(param);
    Swal.fire(param);
  }


  swalError(param : ParametreSwalError =  {
              icon: StatusNotification.ERROR,
              title: "Echec de l'Opération",
              text: "",
              footer: ""
            })
  {
    Swal.fire(param);
  }

  openToast(config : TypeToast = {
    titre : 'Notification',
    message : "",
    status : StatusNotification.SUCCESS  })
  {

    let {message, titre, status} = config;

    const inserted = this.toastr.show(
      message,
      titre,
      this.options,
      this.options.iconClasses[status],
    );
    if (inserted) {
      this.lastInserted.push(inserted.toastId);
    }
  }



  inputValidation(idPlanning, valTitle = 'Insérer le nom du bulletin', valLibelleButton = "Valider") {

    const token = localStorage.getItem("accessToken");
    const typeToken = localStorage.getItem("tokenType");

    Swal.fire({
      title: valTitle,
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: valLibelleButton,
      showLoaderOnConfirm: true,

      preConfirm: (login) => {
        console.log(login);
        return fetch(`${this.link}/bulletins/sauvegades/${login}__${idPlanning}`,
          {method : 'Get',
              headers : {'Authorization': typeToken+" "+token,
                         'User_Connect' : localStorage.getItem("token")}})
          .then(response => {

            if (response.ok==false) {
              throw new Error(response.statusText);
            }
            //return response.json();
            return true;

          })
          .catch(error => {
            Swal.showValidationMessage(
              `Request failed: ${error}`
            );
          });
      },

      allowOutsideClick: () => !Swal.isLoading()

    }).then((result) => {
      console.log(result);
      if (result.value) {
        Swal.fire({
          title: '',
          icon : 'success',
          text : 'Sauvégarde du bulléton éffectué avec succes !!',
          toast : true
        });
      }

    });
  }




}

