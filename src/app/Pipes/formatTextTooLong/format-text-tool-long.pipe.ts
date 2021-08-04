import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTextToolLong'
})
export class FormatTextToolLongPipe implements PipeTransform {

  transform(value: any, args?: number): any {

    if (value != null) {

      let param

      if (args) {
        param = args;
      } else {
        param = 40;
      }

      const text: String = (<String>value);

      const tailleText = text.length;

      if (tailleText > 20) {
        return text.slice(0, param) + '...';
      } else {
        return value;
      }
    } else {
      return value;
    }

  }

}
