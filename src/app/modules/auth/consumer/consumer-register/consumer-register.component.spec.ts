import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerRegisterComponent } from './consumer-register.component';

describe('ConsumerRegisterComponent', () => {
  let component: ConsumerRegisterComponent;
  let fixture: ComponentFixture<ConsumerRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsumerRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsumerRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
