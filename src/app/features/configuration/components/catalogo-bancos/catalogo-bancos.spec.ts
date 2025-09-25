import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoBancos } from './catalogo-bancos';

describe('CatalogoBancos', () => {
  let component: CatalogoBancos;
  let fixture: ComponentFixture<CatalogoBancos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogoBancos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoBancos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
