import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoTipoContrato } from './catalogo-tipo-contrato';

describe('CatalogoTipoContrato', () => {
  let component: CatalogoTipoContrato;
  let fixture: ComponentFixture<CatalogoTipoContrato>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogoTipoContrato]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoTipoContrato);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
