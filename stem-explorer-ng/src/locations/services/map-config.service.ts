import { Injectable } from '@angular/core';
import { Categories } from 'src/app/shared/enums/categories.enum';
import { LocationLevel } from '../models/location';

@Injectable({ providedIn: 'root' })
export class MapConfigService {
  constructor() {}

  /**
   * configuration options for the map.
   */
  mapOptions(): google.maps.MapOptions {
    return {
      scrollwheel: true,
      disableDefaultUI: true,
      disableDoubleClickZoom: true,
      maxZoom: 18,
      minZoom: 8,
      gestureHandling: 'auto', // for gesture controls
      styles: [
        {
          featureType: 'poi',
          stylers: [{ visibility: 'off' }],
        },
        {
          featureType: 'road',
          stylers: [{ visibility: 'simplified' }],
        },
        {
          featureType: 'landscape',
          stylers: [{ visibility: 'simplified' }],
        },
        {
          featureType: 'administrative',
          stylers: [{ visibility: 'off' }],
        },
        {
          featureType: 'transit',
          stylers: [{ visibility: 'off' }],
        },
      ],
    };
  }

  /**
   * returns the map marker icon for the category for the map, or if multiple, returns the red pointer.
   * @param cat the challenge category enum value
   */
  mapMarkerIcons(category: number, levels: LocationLevel[] = []): string {

    let icons;
    let numCompleted = 0;

    levels.forEach (level => {
      if (level.complete === true) {
        numCompleted++;
      }
    });

    if (numCompleted === levels.length) {
      icons = {
        [Categories.Science]: 'map-green-gradient-inverted.svg',
        [Categories.Technology]: 'map-blue-gradient-inverted.svg',
        [Categories.Engineering]: 'map-orange-gradient-inverted.svg',
        [Categories.Maths]: 'map-purple-gradient-inverted.svg',
        4: 'MAP-red-point.svg'
      };
    }else {
      icons = {
        [Categories.Science]: 'map-marker-green.svg',
        [Categories.Technology]: 'map-marker-blue.svg',
        [Categories.Engineering]: 'map-marker-orange.svg',
        [Categories.Maths]: 'map-marker-purple.svg',
        4: 'MAP-red-point.svg'
      };
    }

    return icons[category];
  }
}
