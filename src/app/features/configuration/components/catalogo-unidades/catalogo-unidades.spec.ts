import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoUnidades } from './catalogo-unidades';

describe('CatalogoUnidades', () => {
  let component: CatalogoUnidades;
  let fixture: ComponentFixture<CatalogoUnidades>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogoUnidades]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoUnidades);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
