import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoDocumentoSoporte } from './catalogo-documento-soporte';

describe('CatalogoDocumentoSoporte', () => {
  let component: CatalogoDocumentoSoporte;
  let fixture: ComponentFixture<CatalogoDocumentoSoporte>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogoDocumentoSoporte]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoDocumentoSoporte);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
