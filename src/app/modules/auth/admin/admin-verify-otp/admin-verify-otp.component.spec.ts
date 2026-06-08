import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVerifyOtpComponent } from './admin-verify-otp.component';

describe('AdminVerifyOtpComponent', () => {
  let component: AdminVerifyOtpComponent;
  let fixture: ComponentFixture<AdminVerifyOtpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminVerifyOtpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminVerifyOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
