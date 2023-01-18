import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaInicioComponent } from './cuenta-inicio.component';

describe('CuentaInicioComponent', () => {
  let component: CuentaInicioComponent;
  let fixture: ComponentFixture<CuentaInicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuentaInicioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuentaInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
