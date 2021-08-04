import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTypeInput'
})
export class FormatTypeInputPipe implements PipeTransform {

  transform(value: any, args?: any, args2?: any): any {

    if (value=="ElementStatic" || value=="ElementStaticPourcent"){
      if (args=="type"){
        return "number";
      }
    }

    if (args2=="ElementStatic" || args2=="ElementStaticPourcent"){
      if (args=="label"){
        if (args2=="ElementStaticPourcent"){
          return "#%"+value;
        }
        return "#"+value;
      }else if (args=="name"){
        if (args2=="ElementStaticPourcent"){
          return "#%"+value;
        }
        return "#"+value;
      }
    }
      return value;
  }

}
