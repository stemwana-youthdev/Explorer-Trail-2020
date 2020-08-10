import { Injectable } from '@angular/core';

@Injectable()
export class MapConfigService {


  /**
   * @description controls what is shown on the map
   */
  mapOptions(): google.maps.MapOptions {
    return {
      scrollwheel: true,
      disableDefaultUI: true,
      disableDoubleClickZoom: true,
      maxZoom: 18,
      minZoom: 8,
      gestureHandling: 'cooperative', // for gesture controls
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
          elementType: 'labels',
          stylers: [{ visibility: 'off' }],
        },
        {
          featureType: 'transit',
          stylers: [{ visibility: 'off' }],
        },
      ],
    };
  }


}
