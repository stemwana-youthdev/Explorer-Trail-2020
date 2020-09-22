import { TestBed } from '@angular/core/testing';

import { DirtyFormGuard } from './dirty-form.guard';

describe('DirtyFormGuard', () => {
  let guard: DirtyFormGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DirtyFormGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
