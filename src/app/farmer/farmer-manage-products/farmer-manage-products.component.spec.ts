import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerManageProductsComponent } from './farmer-manage-products.component';

describe('FarmerManageProductsComponent', () => {
  let component: FarmerManageProductsComponent;
  let fixture: ComponentFixture<FarmerManageProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FarmerManageProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmerManageProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
