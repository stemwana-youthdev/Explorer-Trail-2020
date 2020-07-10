import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraButtonComponent } from './camera-button.component';

describe('CameraButtonComponent', () => {
  let component: CameraButtonComponent;
  let fixture: ComponentFixture<CameraButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CameraButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CameraButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
