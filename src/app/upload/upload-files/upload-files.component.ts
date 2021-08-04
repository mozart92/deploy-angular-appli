import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient, HttpEventType, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';
import {API_USE} from '../../ServiceAPI/GeneralAPI';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.sass']
})
export class UploadFilesComponent implements OnInit {

  // link: string = "http://localhost:8080/request";
  link: string = API_USE + '/request';
  public formData = new FormData();
  message: string = '';
  progress = 0;
  currentFile: File;
  status: boolean;

  @Input() filesList: any;
  @Output() sendDataDownload = new EventEmitter();


  constructor(public http: HttpClient) {
  }

  ngOnInit() {
    this.RequestUpload()
  }


  RequestUpload() {

    if (this.filesList != undefined && this.filesList.length > 0) {
      this.progress = 0;

      this.currentFile = this.filesList.item(0);

      console.log("instantiation ", this.currentFile);

      this.formData.append('file', this.currentFile);

      let reqHeader = new HttpHeaders({
        'Content-Type': 'multipart/form-data',
      });


      const req = new HttpRequest('POST', this.link, this.formData, {
        reportProgress: true,
        responseType: 'json',
        headers: reqHeader
      });


      return this.http.request(req)
        .subscribe(
          (event) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              // @ts-ignore
              this.message = event.body.message;
            }
            this.status = true;
            //
            this.sendDataDownload.emit(
              {
                'status': this.status,
                'message': this.message
              }
            )
            this.filesList = undefined;

          },
          (error) => {
            console.log(error);
            this.progress = 0;
            this.message = 'Could not upload the file!';
            this.currentFile = undefined;
            this.status = false;

            this.sendDataDownload.emit(
              {
                'status': this.status,
                'message': this.message
              }
            )
            this.filesList = undefined;

          });

    } else {
      this.status = false;
      this.filesList = undefined;
    }
  }
}
