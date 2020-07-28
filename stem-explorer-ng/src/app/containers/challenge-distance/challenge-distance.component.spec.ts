import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeDistanceComponent } from './challenge-distance.component';

describe('ChallengeDistanceComponent', () => {
  let component: ChallengeDistanceComponent;
  let fixture: ComponentFixture<ChallengeDistanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengeDistanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeDistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
