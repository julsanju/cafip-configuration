import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoDepartamentoCiudades } from './catalogo-departamento-ciudades';

describe('CatalogoDepartamentoCiudades', () => {
  let component: CatalogoDepartamentoCiudades;
  let fixture: ComponentFixture<CatalogoDepartamentoCiudades>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogoDepartamentoCiudades]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoDepartamentoCiudades);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
