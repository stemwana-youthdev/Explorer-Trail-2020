import { Pipe, PipeTransform } from '@angular/core';
import { Location } from 'src/locations/models/location';

@Pipe({
  name: 'sortByDistance'
})
export class SortByDistancePipe implements PipeTransform {

  transform(locations: Location[], distances: number[]): unknown {
    locations = Array.from(locations);
    return locations.sort((a, b) => distances[a.uid] - distances[b.uid]);
  }

}
