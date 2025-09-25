import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoCuentasContables } from './catalogo-cuentas-contables';

describe('CatalogoCuentasContables', () => {
  let component: CatalogoCuentasContables;
  let fixture: ComponentFixture<CatalogoCuentasContables>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogoCuentasContables]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoCuentasContables);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
