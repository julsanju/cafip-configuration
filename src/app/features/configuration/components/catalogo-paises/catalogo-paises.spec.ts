import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoPaises } from './catalogo-paises';

describe('CatalogoPaises', () => {
  let component: CatalogoPaises;
  let fixture: ComponentFixture<CatalogoPaises>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogoPaises]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoPaises);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
