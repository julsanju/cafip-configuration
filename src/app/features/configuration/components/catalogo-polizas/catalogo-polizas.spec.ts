import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoPolizas } from './catalogo-polizas';

describe('CatalogoPolizas', () => {
  let component: CatalogoPolizas;
  let fixture: ComponentFixture<CatalogoPolizas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogoPolizas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoPolizas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
