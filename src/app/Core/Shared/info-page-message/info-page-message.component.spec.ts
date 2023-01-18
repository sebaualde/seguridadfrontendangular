import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPageMessageComponent } from './info-page-message.component';

describe('InfoPageMessageComponent', () => {
  let component: InfoPageMessageComponent;
  let fixture: ComponentFixture<InfoPageMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoPageMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoPageMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
