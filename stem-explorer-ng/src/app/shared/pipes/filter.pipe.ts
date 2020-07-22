import { Pipe, PipeTransform } from '@angular/core';
import { Location } from '../models/location';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: Location[], filter: any[]) {
    console.warn(filter)
    console.warn(value)
    filter = filter.map(Number);
    const filtered = value.filter(item => filter.includes(item.locationChallenges.challengeCateogry));
    console.warn(filtered)
    return filtered;
  }

}
