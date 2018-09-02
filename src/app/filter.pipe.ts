import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], prop: any, searchValue: string): any {
    if (!searchValue)
      return value;
    return value.filter(item => {
      return item[prop].toLowerCase().includes(searchValue.toLowerCase());
    });
  }

}
