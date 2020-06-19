import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListViewDialogComponent } from './list-view-dialog.component';

describe('ListViewDialogComponent', () => {
  let component: ListViewDialogComponent;
  let fixture: ComponentFixture<ListViewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListViewDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
