import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaCategoriasComponent } from './cuenta-categorias.component';

describe('CuentaCategoriasComponent', () => {
  let component: CuentaCategoriasComponent;
  let fixture: ComponentFixture<CuentaCategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuentaCategoriasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuentaCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
