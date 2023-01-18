import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterMessageComponent } from './register-message.component';

describe('RegisterMessageComponent', () => {
  let component: RegisterMessageComponent;
  let fixture: ComponentFixture<RegisterMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
