import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerManageOrdersComponent } from './manage-orders.component';

describe('ManageOrdersComponent', () => {
  let component: FarmerManageOrdersComponent;
  let fixture: ComponentFixture<FarmerManageOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FarmerManageOrdersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmerManageOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
