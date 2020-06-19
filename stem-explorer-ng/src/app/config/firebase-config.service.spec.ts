import { TestBed } from '@angular/core/testing';

import { FirebaseConfigService } from './firebase-config.service';

describe('FirebaseConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirebaseConfigService = TestBed.get(FirebaseConfigService);
    expect(service).toBeTruthy();
  });
});
