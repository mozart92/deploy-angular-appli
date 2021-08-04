import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageByDefault'
})
export class ImageByDefaultPipe implements PipeTransform {

  transform(value: any, args?: any): any {



    if (value == null || value == "" || value == undefined){
      return "articleImage2.jpg";
    }else {
      return value;
    }

  }

}
