import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterButtonsComponent } from './filter-buttons.component';

describe('FilterButtonsComponent', () => {
  let component: FilterButtonsComponent;
  let fixture: ComponentFixture<FilterButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
