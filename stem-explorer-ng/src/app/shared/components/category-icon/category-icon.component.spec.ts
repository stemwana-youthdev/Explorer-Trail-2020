import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryIconComponent } from './category-icon.component';

describe('CategoryIconComponent', () => {
  let component: CategoryIconComponent;
  let fixture: ComponentFixture<CategoryIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
