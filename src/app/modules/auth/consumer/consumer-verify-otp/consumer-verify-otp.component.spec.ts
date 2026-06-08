import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerVerifyOtpComponent } from './consumer-verify-otp.component';

describe('ConsumerVerifyOtpComponent', () => {
  let component: ConsumerVerifyOtpComponent;
  let fixture: ComponentFixture<ConsumerVerifyOtpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsumerVerifyOtpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsumerVerifyOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
