import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryFormFieldComponent } from './category-form-field.component';

describe('CategoryFormFieldComponent', () => {
  let component: CategoryFormFieldComponent;
  let fixture: ComponentFixture<CategoryFormFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryFormFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryFormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
