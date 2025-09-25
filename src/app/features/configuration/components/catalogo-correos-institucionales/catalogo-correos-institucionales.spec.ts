import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoCorreosInstitucionales } from './catalogo-correos-institucionales';

describe('CatalogoCorreosInstitucionales', () => {
  let component: CatalogoCorreosInstitucionales;
  let fixture: ComponentFixture<CatalogoCorreosInstitucionales>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogoCorreosInstitucionales]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoCorreosInstitucionales);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
