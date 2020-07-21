import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncorrectDialogComponent } from './incorrect-dialog.component';

describe('SuccessDialogComponent', () => {
  let component: IncorrectDialogComponent;
  let fixture: ComponentFixture<IncorrectDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncorrectDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncorrectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
