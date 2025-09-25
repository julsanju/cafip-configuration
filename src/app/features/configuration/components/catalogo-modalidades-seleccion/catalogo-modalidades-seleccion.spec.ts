import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoModalidadesSeleccion } from './catalogo-modalidades-seleccion';

describe('CatalogoModalidadesSeleccion', () => {
  let component: CatalogoModalidadesSeleccion;
  let fixture: ComponentFixture<CatalogoModalidadesSeleccion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogoModalidadesSeleccion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoModalidadesSeleccion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
