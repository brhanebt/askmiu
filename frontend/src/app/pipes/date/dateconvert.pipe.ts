import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateconvert'
})
export class DateconvertPipe implements PipeTransform {

  constructor(private datepipe: DatePipe){}
  transform(value: any, ...args: any[]): any {
    return this.datepipe.transform(value,'EEEE, MMMM d, y');
  }
}
