import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeMapComponent } from './challenge-map.component';

describe('ChallengeMapComponent', () => {
  let component: ChallengeMapComponent;
  let fixture: ComponentFixture<ChallengeMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengeMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
