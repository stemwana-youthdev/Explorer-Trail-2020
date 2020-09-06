import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeProgressComponent } from './challenge-progress.component';

describe('ChallengeProgressComponent', () => {
  let component: ChallengeProgressComponent;
  let fixture: ComponentFixture<ChallengeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengeProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
