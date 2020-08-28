import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'largeDistance',
})
export class LargeDistancePipe implements PipeTransform {
  transform(distance: number): string {
    if (distance === undefined || distance === null) {
      return '';
    } else if (distance >= 1000) {
      return `${(distance / 1000).toFixed(1)}km`;
    } else {
      return `${distance.toFixed(0)}m`;
    }
  }
}
