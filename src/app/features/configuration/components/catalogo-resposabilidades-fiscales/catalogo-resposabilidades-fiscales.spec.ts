import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoResposabilidadesFiscales } from './catalogo-resposabilidades-fiscales';

describe('CatalogoResposabilidadesFiscales', () => {
  let component: CatalogoResposabilidadesFiscales;
  let fixture: ComponentFixture<CatalogoResposabilidadesFiscales>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogoResposabilidadesFiscales]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoResposabilidadesFiscales);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
