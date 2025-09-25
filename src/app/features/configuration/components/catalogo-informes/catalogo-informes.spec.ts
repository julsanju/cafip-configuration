import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoInformes } from './catalogo-informes';

describe('CatalogoInformes', () => {
  let component: CatalogoInformes;
  let fixture: ComponentFixture<CatalogoInformes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogoInformes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoInformes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
