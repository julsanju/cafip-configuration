import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoTiposProcesos } from './catalogo-tipos-procesos';

describe('CatalogoTiposProcesos', () => {
  let component: CatalogoTiposProcesos;
  let fixture: ComponentFixture<CatalogoTiposProcesos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogoTiposProcesos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoTiposProcesos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
