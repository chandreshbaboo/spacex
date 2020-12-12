import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { SpaceProgramsService } from './space-programs.service';

describe('SpaceProgramsService', () => {
  let service: SpaceProgramsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        SpaceProgramsService
      ]
    });
    service = TestBed.inject(SpaceProgramsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
