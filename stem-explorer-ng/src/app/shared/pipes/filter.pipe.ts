import { Pipe, PipeTransform } from '@angular/core';
import { Filter } from 'src/locations/models/filter';
import { LocationChallenge } from 'src/locations/models/location';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: LocationChallenge[], filter: Filter) {
    return value.filter(
      (item) =>
        filter.categories.includes(item.challengeCategory) &&
        (filter.showCompleted ||
          !item.challengeLevels.every((level) => level.complete))
    );
  }

}
