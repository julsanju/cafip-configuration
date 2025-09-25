import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoMediosPagos } from './catalogo-medios-pagos';

describe('CatalogoMediosPagos', () => {
  let component: CatalogoMediosPagos;
  let fixture: ComponentFixture<CatalogoMediosPagos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogoMediosPagos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoMediosPagos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
