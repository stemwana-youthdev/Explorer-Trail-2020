import { Pipe, PipeTransform } from '@angular/core';
import { Location } from 'src/locations/models/location';

@Pipe({
  name: 'filterLocations'
})
export class FilterLocationsPipe implements PipeTransform {

  transform(value: Location[], filter: any[]) {
    filter = filter.map(Number);
    return value.filter((item) =>
      item.locationChallenges.some((challenge) =>
        filter.includes(challenge.challengeCategory)
      )
    );
  }

}
