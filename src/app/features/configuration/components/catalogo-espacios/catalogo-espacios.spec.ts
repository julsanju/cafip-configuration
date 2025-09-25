import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoEspacios } from './catalogo-espacios';

describe('CatalogoEspacios', () => {
  let component: CatalogoEspacios;
  let fixture: ComponentFixture<CatalogoEspacios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogoEspacios]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoEspacios);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
