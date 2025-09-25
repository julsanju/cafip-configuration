import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoCodigosCiiu } from './catalogo-codigos-ciiu';

describe('CatalogoCodigosCiiu', () => {
  let component: CatalogoCodigosCiiu;
  let fixture: ComponentFixture<CatalogoCodigosCiiu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogoCodigosCiiu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoCodigosCiiu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
