import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoPresupuesto } from './catalogo-presupuesto';

describe('CatalogoPresupuesto', () => {
  let component: CatalogoPresupuesto;
  let fixture: ComponentFixture<CatalogoPresupuesto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogoPresupuesto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoPresupuesto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
