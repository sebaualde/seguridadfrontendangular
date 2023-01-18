import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorTestsComponent } from './error-tests.component';

describe('ErrorTestsComponent', () => {
  let component: ErrorTestsComponent;
  let fixture: ComponentFixture<ErrorTestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorTestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
