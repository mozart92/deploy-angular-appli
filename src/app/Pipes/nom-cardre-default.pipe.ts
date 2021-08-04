import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nomCardreDefault'
})
export class NomCardreDefaultPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    let val: number = (<number>value);

    if (val==null || val>4){
      return 2;
    }
    return val;
  }

}
