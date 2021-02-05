import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotAdminDialogComponent } from './not-admin-dialog.component';

describe('NotAdminDialogComponent', () => {
  let component: NotAdminDialogComponent;
  let fixture: ComponentFixture<NotAdminDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotAdminDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotAdminDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
