import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoBienesAgrupados } from './catalogo-bienes-agrupados';

describe('CatalogoBienesAgrupados', () => {
  let component: CatalogoBienesAgrupados;
  let fixture: ComponentFixture<CatalogoBienesAgrupados>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogoBienesAgrupados]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoBienesAgrupados);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
