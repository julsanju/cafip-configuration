import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoJustificacionGasto } from './catalogo-justificacion-gasto';

describe('CatalogoJustificacionGasto', () => {
  let component: CatalogoJustificacionGasto;
  let fixture: ComponentFixture<CatalogoJustificacionGasto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogoJustificacionGasto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoJustificacionGasto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
