import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeTitleComponent } from './challenge-title.component';

describe('ChallengeTitleComponent', () => {
  let component: ChallengeTitleComponent;
  let fixture: ComponentFixture<ChallengeTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengeTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
