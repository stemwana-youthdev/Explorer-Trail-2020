import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { MatDialog } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { InfoLocationClickEvent } from '../../components/challenge-map/challenge-map.component';
import { Categories } from '../../shared/enums/categories.enum';
import { Location } from '../../shared/models/location';
import { ChallengesState } from '../../store/challenges/challenges.state';
import { LoadLocationsData } from '../../store/locations/locations.actions';
import { LocationsState } from '../../store/locations/locations.state';
import { ChallengeDialogComponent } from '../challenge-dialog/challenge-dialog.component';




@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @Select(LocationsState.locations) public locations$: Observable<Location[]>;
  @Select(ChallengesState.challengeFilter) public filter$: Observable<number[]>;

  //Variables from challengeMap-------------------------------------------------------
  // @Input() locations: Location[] = [];
  // @Input() filter: number[];
  watchGeolocation = true;

  @Output() challengeLocationClick = new EventEmitter<Location>();
  @Output() infoLocationClick = new EventEmitter<InfoLocationClickEvent>();

  private TaurangaLocation = {
    lat: -37.6854709,
    lng: 176.1673285,
  };

  zoom = 15;
  // Tauranga
  center: google.maps.LatLngLiteral = this.TaurangaLocation;

  // controls what function is shown on the map
  options: google.maps.MapOptions = {
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
        elementType: 'labels',
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'transit',
        stylers: [{ visibility: 'off' }],
      },
    ],
  };

  private geolocationWatchId: number;

  private icons = {
    [Categories.Science]: '/assets/icons/light green point.svg',
    [Categories.Technology]: '/assets/icons/light blue point.svg',
    [Categories.Engineering]: '/assets/icons/light orange point.svg',
    [Categories.Maths]: '/assets/icons/purple point.svg',
  };
  //-----------------------------------------------------------------------------

  // added a dependency injection in order to use the getLocations method without creating an instance of the object
  constructor(
    private store: Store,
    private dialog: MatDialog,
  ) { }

  // separate property for the information for the map pop up
  infoLocation = null as Location;

  //@ViewChild(ChallengeMapComponent, { static: false }) challengeMap: ChallengeMapComponent;
  
  //challengeMap variable---------------------
  @ViewChild(MapInfoWindow, {static: false}) infoWindow: MapInfoWindow;
  //---------------------------------

  ngOnInit() {
    this.store.dispatch(new LoadLocationsData());

    //challengeMap
    if(this.watchGeolocation){
      this.loadGeolocation();
    }
  }

  //challengeMap-------------------------------
  ngOnDestroy() {
    navigator.geolocation?.clearWatch(this.geolocationWatchId);
  }

  private loadGeolocation() {
    if (!navigator.geolocation) {
      console.warn('Geolocation not supported');
      return;
    }

    this.geolocationWatchId = navigator.geolocation.watchPosition((position) => {
      const { latitude, longitude } = position.coords;
      this.center = {
        lat: latitude,
        lng: longitude,
      };
    });
  }

  onLocationClick(marker: MapMarker, location: Location) {
    if (location.challengeid) {
      // this.challengeLocationClick.emit(location);
      this.openChallengeDialog(location);
    } else {
      this.onInfoLocationClick({ location, marker });
    }
  }

  getMarkerOptions(location: Location): google.maps.MarkerOptions {
    return {
      icon: this.getIconForMarker(location),
    };
  }

  private getIconForMarker(location: Location): google.maps.Icon {
    return {
      url: this.icons[location.category],
      scaledSize: new google.maps.Size(30, 48),
    };
  }

  public openInfoLocation(marker: MapMarker) {
    this.infoWindow.open(marker);
  }
  //-------------------------------------------

  onChallengeLocationClick(location: Location) {
    this.openChallengeDialog(location);
  }

  onInfoLocationClick({ location, marker }: InfoLocationClickEvent) {
    this.infoLocation = location;
    //this.challengeMap.openInfoLocation(marker);
    this.openInfoLocation(marker);
  }

  private openChallengeDialog(location: Location) {
    this.dialog.open(ChallengeDialogComponent, {
      data: {
        challengeId: location.challengeid,
      },
      panelClass: 'app-dialog',
    });
  }
}
