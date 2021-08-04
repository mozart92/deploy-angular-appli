import {
  Component,
  Input,
  OnChanges,
  OnInit,
  QueryList,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  VERSION,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {ngxLoadingAnimationTypes, NgxLoadingComponent} from 'ngx-loading';
import Swal from 'sweetalert2';
import {GlobalConfig, ToastContainerDirective, ToastrService, ToastNoAnimation} from 'ngx-toastr';

const PrimaryWhite = '#fff';
const SecondaryGrey = '#ccc';
const PrimaryRed = 'var(--danger)';
const SecondaryBlue = 'var(--primary)';
const types = ['success', 'error', 'info', 'warning'];

export enum StatusNotification {
  SUCCESS = "success",
  ERROR = "error",
  INFO = "info",
  WARNING = "warning"
}

export interface TypeConfigNotification {
  showModalBlock?:boolean;
  showLoading?: { show : boolean, text? : String };
  showToast?: boolean;
}

export interface TypeToast{
  titre? : string;
  message? : string;
  status? : StatusNotification
}

export interface ParamettreSwalConfirm{
  title?: string;
  text?: string;
  icon?: StatusNotification;
  showCancelButton?: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
  reverseButtons?: boolean;
}

interface Quote {
  title?: string;
  message?: string;
}

export interface ParametreSwalSucces {
  //position?: string;
  icon?: StatusNotification;
  title?: string;
  showConfirmButton?: boolean;
  timer?: number;
}

export interface ParametreSwalInfo {
  title?: string;
  icon?: StatusNotification;
  html?: string;
  showCloseButton?: boolean;
  showCancelButton?: boolean;
  focusConfirm?: boolean;
  confirmButtonText?:string;
  confirmButtonAriaLabel?: string;
  cancelButtonText?:string;
  cancelButtonAriaLabel?: string;
}

export interface ParametreSwalError{
  icon?: StatusNotification;
  title?: string;
  text?: string;
  footer?: string;
}


@Component({
  selector: 'app-notifications-operation',
  templateUrl: './notifications-operation.component.html',
  styleUrls: ['./notifications-operation.component.sass'],
  styles : [`
    .font-icon-wrapper{
      position: fixed!important;
      left: 50%!important;
      top: 50px!important;
      border-style: none!important;
      background-color: transparent!important;
      margin: 0px!important;
      z-index: 200000000000000;
    }
  `]
})
export class NotificationsOperationComponent implements OnInit, OnChanges {


  @ViewChild('ngxLoading') ngxLoadingComponent: NgxLoadingComponent;
  @ViewChild('customLoadingTemplate') customLoadingTemplate: TemplateRef<any>;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = true;
  public primaryColour = PrimaryWhite;
  public secondaryColour = SecondaryGrey;
  public coloursEnabled = false;
  public loadingTemplate: TemplateRef<any>;
  public config = {
    animationType: ngxLoadingAnimationTypes.none,
    primaryColour: this.primaryColour,
    secondaryColour: this.secondaryColour,
    tertiaryColour: this.primaryColour,
    backdropBorderRadius: '3px'
  };


  @Input() configShowNotif : TypeConfigNotification = {showModalBlock : false,
                                                      showLoading : {show : false, text : "Chargement encour"}};


  @Input() configToast : TypeToast = {titre : "Notification", message : "", status : StatusNotification.SUCCESS};

   @Input() changeState : number = 2;



  options: GlobalConfig;
  title = '';
  message = '';
  type = types[0];
  version = VERSION;
  enableBootstrap = false;
  private lastInserted: number[] = [];
  inline = false;
  inlinePositionIndex = 0;
  @ViewChildren(ToastContainerDirective) inlineContainers: QueryList<ToastContainerDirective>;


  constructor(public toastr: ToastrService, private renderer: Renderer2) {
    this.options = this.toastr.toastrConfig;
  }

  ngOnInit(): void {
    this.activeNotificationOperation(this.configShowNotif, this.configToast);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.activeNotificationOperation(this.configShowNotif, this.configToast);
  }


  activeNotificationOperation(config : TypeConfigNotification, configToast : TypeToast){

    if (config.showToast){
      this.openToast(configToast);
    }

  }




//POUR LES TOASTS


  openToast(config : TypeToast) {
    // Clone current config so it doesn't change when ngModel updates

    const inserted = this.toastr.show(
      config.message,
      config.titre,
      this.options,
      this.options.iconClasses[config.status],
    );
    if (inserted) {
      this.lastInserted.push(inserted.toastId);
    }
    //return inserted;
  }



}
