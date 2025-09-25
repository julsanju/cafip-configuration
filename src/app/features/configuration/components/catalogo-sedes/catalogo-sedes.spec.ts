import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoSedes } from './catalogo-sedes';

describe('CatalogoSedes', () => {
  let component: CatalogoSedes;
  let fixture: ComponentFixture<CatalogoSedes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogoSedes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoSedes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
