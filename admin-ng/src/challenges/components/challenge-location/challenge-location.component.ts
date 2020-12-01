import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Challenge } from 'src/app/shared/models/challenges.model';
import { Dropdown } from 'src/app/shared/models/dropdown.model';
import { Location } from 'src/app/shared/models/locations.model';
import { ApiService } from 'src/app/shared/services/api.service';
import { ChallengeFormsFactory } from 'src/challenges/factories/forms.factory';

@Component({
  selector: 'app-challenge-location',
  templateUrl: './challenge-location.component.html',
  styleUrls: ['./challenge-location.component.scss']
})
export class ChallengeLocationComponent implements OnInit {
  @Input() challenge: Challenge;
  @Input() location?: Location;
  @Output() saveLocation = new EventEmitter<any>();

  // dropdown: Dropdown[];
  form = new FormGroup({});
  fields: FormlyFieldConfig[];

  constructor(
    private service: ApiService,
    readonly formFactory: ChallengeFormsFactory
  ) {}

  ngOnInit(): void {
    this.getLocations();
  }

  onSave(): void {
    this.saveLocation.emit();
  }

  private getLocations(): void {
    this.service.getLocationsDropdown().subscribe(res => {
      // this.dropdown = res;
      this.fields = this.formFactory.addLocationForm(res);
    });
  }
}
