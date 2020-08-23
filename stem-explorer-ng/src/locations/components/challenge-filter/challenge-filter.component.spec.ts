import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeFilterComponent } from './challenge-filter.component';

describe('ChallengeFilterComponent', () => {
  let component: ChallengeFilterComponent;
  let fixture: ComponentFixture<ChallengeFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengeFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
