import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsumosServiciosComponent } from './insumos-servicios.component';

describe('InsumosServiciosComponent', () => {
  let component: InsumosServiciosComponent;
  let fixture: ComponentFixture<InsumosServiciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsumosServiciosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsumosServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
