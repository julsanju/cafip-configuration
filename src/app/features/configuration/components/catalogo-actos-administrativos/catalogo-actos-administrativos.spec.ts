import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoActosAdministrativos } from './catalogo-actos-administrativos';

describe('CatalogoActosAdministrativos', () => {
  let component: CatalogoActosAdministrativos;
  let fixture: ComponentFixture<CatalogoActosAdministrativos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogoActosAdministrativos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoActosAdministrativos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
