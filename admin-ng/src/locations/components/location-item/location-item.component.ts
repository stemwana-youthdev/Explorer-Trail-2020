import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '../../../app/shared/models/locations.model';
import { ApiService } from '../../../app/shared/services/api.service';
import { FormsFactory } from '../../factories/forms.factory';
import { Challenge } from '../../../app/shared/models/challenges.model';
import { Table } from '../../../app/shared/models/table.model';
import { TablesFactory } from '../../factories/tables.factory';
import { NavButton } from '../../../app/shared/models/nav-button.model';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-location-item',
  templateUrl: './location-item.component.html',
  styleUrls: ['./location-item.component.scss'],
  providers: [FormsFactory, TablesFactory]
})
export class LocationItemComponent implements OnInit {
  location: Location;
  locationId: string;
  challenges: Challenge[];
  challengeTable: Table;
  form = new FormGroup({});
  fields: FormlyFieldConfig[];

  topButtons: NavButton[] = [
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
    readonly formFactory: FormsFactory,
    readonly tableFactory: TablesFactory,
    private router: Router
  ) {
    this.locationId = this.activatedRoute.snapshot.params['id'];
    this.challengeTable = this.tableFactory.locationChallenges();
    this.fields = this.formFactory.locationForm();
  }

  ngOnInit(): void {
    if (this.locationId) {
      this.getLocation();
    } else {
      this.location = {
        id: null,
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
        this.router.navigate([`locations/${this.location.id}`]);
      });
    }
  }

  private getLocation(): void {
    this.service.getLocation(this.locationId).subscribe(res => {
      this.location = res;
      this.challenges = res.locationChallenges;
    });
  }
}
