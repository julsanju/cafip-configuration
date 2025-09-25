import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoTiposBienes } from './catalogo-tipos-bienes';

describe('CatalogoTiposBienes', () => {
  let component: CatalogoTiposBienes;
  let fixture: ComponentFixture<CatalogoTiposBienes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogoTiposBienes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoTiposBienes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
