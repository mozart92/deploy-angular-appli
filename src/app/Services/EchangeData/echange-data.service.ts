import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EchangeDataService {

  monObservable: Observable<any>;

  constructor(private http : HttpClient) { }

  injecteData(data){
    this.monObservable = new Observable<any>((observer)=> {observer.next(data)});
  }

  getDataInjecter(){
    return this.monObservable;
  }

  injectDataFichers(dataFiche){
    this.monObservable = new Observable<any>((observer)=> {observer.next(dataFiche)});

  }





}
