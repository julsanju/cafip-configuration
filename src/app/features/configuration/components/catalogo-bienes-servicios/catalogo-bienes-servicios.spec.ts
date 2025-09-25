import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoBienesServicios } from './catalogo-bienes-servicios';

describe('CatalogoBienesServicios', () => {
  let component: CatalogoBienesServicios;
  let fixture: ComponentFixture<CatalogoBienesServicios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogoBienesServicios]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoBienesServicios);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
