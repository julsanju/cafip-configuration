import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoTiposRegimen } from './catalogo-tipos-regimen';

describe('CatalogoTiposRegimen', () => {
  let component: CatalogoTiposRegimen;
  let fixture: ComponentFixture<CatalogoTiposRegimen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogoTiposRegimen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoTiposRegimen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
