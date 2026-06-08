import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerLoginComponent } from './consumer-login.component';

describe('ConsumerLoginComponent', () => {
  let component: ConsumerLoginComponent;
  let fixture: ComponentFixture<ConsumerLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsumerLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsumerLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
