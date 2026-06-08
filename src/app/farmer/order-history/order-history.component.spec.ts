import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerOrderHistoryComponent } from './order-history.component';

describe('OrderHistoryComponent', () => {
  let component: FarmerOrderHistoryComponent;
  let fixture: ComponentFixture<FarmerOrderHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FarmerOrderHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmerOrderHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
