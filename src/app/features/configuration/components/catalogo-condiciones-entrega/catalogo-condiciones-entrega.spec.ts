import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoCondicionesEntrega } from './catalogo-condiciones-entrega';

describe('CatalogoCondicionesEntrega', () => {
  let component: CatalogoCondicionesEntrega;
  let fixture: ComponentFixture<CatalogoCondicionesEntrega>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogoCondicionesEntrega]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoCondicionesEntrega);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
