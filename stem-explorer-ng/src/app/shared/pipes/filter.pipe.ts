import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], filter: any[]) {
    filter = filter.map(Number);
    return value.filter(item => filter.includes(item.category));
  }
}
