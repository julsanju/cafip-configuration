import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoTiposIdentificacion } from './catalogo-tipos-identificacion';

describe('CatalogoTiposIdentificacion', () => {
  let component: CatalogoTiposIdentificacion;
  let fixture: ComponentFixture<CatalogoTiposIdentificacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogoTiposIdentificacion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoTiposIdentificacion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
