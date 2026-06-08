import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerVerifyOtpComponent } from './farmer-verify-otp.component';

describe('FarmerVerifyOtpComponent', () => {
  let component: FarmerVerifyOtpComponent;
  let fixture: ComponentFixture<FarmerVerifyOtpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FarmerVerifyOtpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmerVerifyOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
