import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoImpuestos } from './catalogo-impuestos';

describe('CatalogoImpuestos', () => {
  let component: CatalogoImpuestos;
  let fixture: ComponentFixture<CatalogoImpuestos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogoImpuestos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoImpuestos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
