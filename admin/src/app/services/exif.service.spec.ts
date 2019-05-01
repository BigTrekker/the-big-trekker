import { TestBed } from '@angular/core/testing';

import { ExifService } from './exif.service';

describe('ExifService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExifService = TestBed.get(ExifService);
    expect(service).toBeTruthy();
  });
});
