import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortBy'
})
export class SortByPipe<T> implements PipeTransform {

  transform(array: T[], prop: ((x: T) => number | string) | string): T[] {
    const f = typeof prop === 'string' ? (x: T) => x[prop] : prop;
    array = Array.from(array);
    array.sort((a, b) => f(a) >= f(b) ? 1 : -1);
    return array;
  }

}
