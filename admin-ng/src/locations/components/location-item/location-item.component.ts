import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '../../../app/shared/models/locations.model';
import { ApiService } from '../../../app/shared/services/api.service';
import { FormsFactory } from '../../factories/forms.factory';
import { Challenge } from '../../../app/shared/models/challenges.model';
import { Table } from '../../../app/shared/models/table.model';
import { NavButton } from '../../../app/shared/models/nav-button.model';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { LocationsTablesFactory } from 'src/locations/factories/tables.factory';

@Component({
  selector: 'app-location-item',
  templateUrl: './location-item.component.html',
  styleUrls: ['./location-item.component.scss'],
})
export class LocationItemComponent implements OnInit {
  location: Location;
  locationId: string;
  challenges: Challenge[];
  challengeTable: Table;
  form = new FormGroup({});
  fields: FormlyFieldConfig[];

  deleteButton: NavButton = {
    label: 'Delete',
    onClick: () => this.deleteLocation(),
    colour: 'pink'
  };

  topButtons: NavButton[] = [
    this.deleteButton,
    {
      label: 'Back to Locations',
      link: 'locations',
      colour: 'light-blue'
    }
  ];

  get title(): string {
    return this.locationId ? this.location?.name : 'Create New Location';
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: ApiService,
    private formFactory: FormsFactory,
    private tableFactory: LocationsTablesFactory,
    private router: Router
  ) {
    this.locationId = this.activatedRoute.snapshot.params.id;
    this.challengeTable = this.tableFactory.locationChallenges();
    this.fields = this.formFactory.locationForm();
  }

  ngOnInit(): void {
    if (this.locationId) {
      this.getLocation();
    } else {
      this.location = {
        uid: undefined,
        name: '',
        address: '',
        position: { lat: null, lng: null }
      };
    }
  }

  openChallenge(challenge: Challenge): any {
    console.warn(challenge);
  }

  saveLocation(): void {
    if (this.location.order) {
      // Make sure that order is an int
      this.location.order = Math.round(this.location.order);
    }

    console.warn(this.location);
    if (this.locationId) {
      console.warn('has location');
      this.service.updateLocation(this.location).subscribe(res => {
        console.warn(res);
        // this.location = res;
      });
    } else {
      console.warn('new location');
      this.service.createLocation(this.location).subscribe(res => {
        this.location = res;
        this.router.navigate([`locations/${this.location.uid}`]);
      });
    }
  }

  private getLocation(): void {
    this.service.getLocation(this.locationId).subscribe(res => {
      this.location = res;
      this.challenges = res.locationChallenges;
    });
  }

  private deleteLocation(): void {
    this.service.deleteLocation(this.locationId).subscribe(() => {
      this.router.navigate(['locations']);
    });
  }
}
