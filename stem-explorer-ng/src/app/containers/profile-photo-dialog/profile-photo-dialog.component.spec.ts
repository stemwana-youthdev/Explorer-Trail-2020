import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePhotoDialogComponent } from './profile-photo-dialog.component';

describe('ProfilePhotoDialogComponent', () => {
  let component: ProfilePhotoDialogComponent;
  let fixture: ComponentFixture<ProfilePhotoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilePhotoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePhotoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
