import { Pipe, PipeTransform } from '@angular/core';
import { Filter } from 'src/locations/models/filter';
import { Location } from 'src/locations/models/location';

@Pipe({
  name: 'filterLocations'
})
export class FilterLocationsPipe implements PipeTransform {

  transform(value: Location[], filter: Filter) {
    console.warn(filter)
    return value.filter((item) =>
      item.locationChallenges.some(
        (challenge) =>
          filter.categories.includes(challenge.challengeCategory) &&
          (filter.showCompleted ||
            !challenge.challengeLevels.every((level) => level.complete))
      )
    );
  }

}
