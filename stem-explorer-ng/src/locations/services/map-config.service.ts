import { Injectable } from '@angular/core';
import { Location, LocationChallenge } from '../models/location';
import { MapIcon, MapIconInverted } from '../models/map-icons.constant';

@Injectable({ providedIn: 'root' })
export class MapConfigService {
  mapCentre = new google.maps.LatLng(-37.6854709, 176.1673285);

  constructor() {}

  /**
   * configuration options for the map.
   */
  mapOptions(): google.maps.MapOptions {
    return {
      center: this.mapCentre,
      zoom: 16,
      scrollwheel: true,
      disableDefaultUI: true,
      disableDoubleClickZoom: true,
      maxZoom: 18,
      minZoom: 8,
      gestureHandling: 'auto',
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

  addMarker(location: Location): google.maps.Marker {
    const marker = new google.maps.Marker({
      position: new google.maps.LatLng(location.position),
      title: location.name,
      icon: {
        url: this.returnMapIcon(location.locationChallenges),
        scaledSize: new google.maps.Size(30, 48)
      }
    });

    return marker;
  }

  returnMapIcon(challenges: LocationChallenge[]): string {
    let marker: string;

    if (challenges.length > 1) {
      let numCompleted = 0;
      let levelsCount = 0;
      challenges.forEach(c => {
        levelsCount = c.challengeLevels.length;
        c.challengeLevels.forEach(l => {
          if (l.complete) { numCompleted++; }
        });
      });
      marker = numCompleted === levelsCount ? MapIconInverted[4] : MapIcon[4];
    } else {
      challenges[0].challengeLevels.forEach(l => {
        if (l.complete) {
          marker = MapIconInverted[challenges[0].challengeCategory];
        } else {
          marker = MapIcon[challenges[0].challengeCategory];
        }
      });
    }
    return marker;
  }
}
