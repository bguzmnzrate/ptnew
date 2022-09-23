import { TestBed } from '@angular/core/testing';

import { InsumosService } from './insumos.service';

describe('InsumosServiciosService', () => {
  let service: InsumosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsumosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
