import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortBy'
})
export class SortByPipe<T> implements PipeTransform {

  transform(array: T[], prop: (x: T) => number | string): T[] {
    array = Array.from(array);
    array.sort((a, b) => prop(a) >= prop(b) ? 1 : -1);
    return array;
  }

}
