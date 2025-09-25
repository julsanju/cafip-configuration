import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoDocumentacionMinima } from './catalogo-documentacion-minima';

describe('CatalogoDocumentacionMinima', () => {
  let component: CatalogoDocumentacionMinima;
  let fixture: ComponentFixture<CatalogoDocumentacionMinima>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogoDocumentacionMinima]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoDocumentacionMinima);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
