import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoTiposPersonas } from './catalogo-tipos-personas';

describe('CatalogoTiposPersonas', () => {
  let component: CatalogoTiposPersonas;
  let fixture: ComponentFixture<CatalogoTiposPersonas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogoTiposPersonas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoTiposPersonas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
