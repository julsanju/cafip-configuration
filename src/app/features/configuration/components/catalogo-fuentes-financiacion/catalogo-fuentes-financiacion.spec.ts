import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoFuentesFinanciacion } from './catalogo-fuentes-financiacion';

describe('CatalogoFuentesFinanciacion', () => {
  let component: CatalogoFuentesFinanciacion;
  let fixture: ComponentFixture<CatalogoFuentesFinanciacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogoFuentesFinanciacion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoFuentesFinanciacion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
