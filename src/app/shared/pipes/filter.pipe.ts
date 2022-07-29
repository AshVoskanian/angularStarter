import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(array: any, searchQuerry: any): any {
    if (searchQuerry === undefined) {
      return array;
    }

    return array ? array.filter(item => item.name.toLowerCase().includes(searchQuerry.toLowerCase())) : [];
  }


}
