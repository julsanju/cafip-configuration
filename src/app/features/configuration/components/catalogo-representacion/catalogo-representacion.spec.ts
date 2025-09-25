import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoRepresentacion } from './catalogo-representacion';

describe('CatalogoRepresentacion', () => {
  let component: CatalogoRepresentacion;
  let fixture: ComponentFixture<CatalogoRepresentacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogoRepresentacion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoRepresentacion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
