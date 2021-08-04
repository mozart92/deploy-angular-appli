import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translateContenu'
})
export class TranslateContenuPipe implements PipeTransform {

  transform(value: any, args?: any, args2?: any): any {
    if (args2=="en"){
      return args;
    }
    return value;
  }
}
