import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoMovimientosAlmacen } from './catalogo-movimientos-almacen';

describe('CatalogoMovimientosAlmacen', () => {
  let component: CatalogoMovimientosAlmacen;
  let fixture: ComponentFixture<CatalogoMovimientosAlmacen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogoMovimientosAlmacen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoMovimientosAlmacen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
