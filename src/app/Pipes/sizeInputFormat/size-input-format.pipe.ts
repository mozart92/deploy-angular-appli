import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sizeInputFormat'
})
export class SizeInputFormatPipe implements PipeTransform {

  transform(value: number, ...args: number[]): number {
    return null;
  }

}
