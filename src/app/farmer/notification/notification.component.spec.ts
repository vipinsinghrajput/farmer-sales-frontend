import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerNotificationComponent } from './notification.component';

describe('NotificationComponent', () => {
  let component: FarmerNotificationComponent;
  let fixture: ComponentFixture<FarmerNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FarmerNotificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmerNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
