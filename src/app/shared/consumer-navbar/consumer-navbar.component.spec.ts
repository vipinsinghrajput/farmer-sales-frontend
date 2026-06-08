import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerNavbarComponent } from './consumer-navbar.component';

describe('ConsumerNavbarComponent', () => {
  let component: ConsumerNavbarComponent;
  let fixture: ComponentFixture<ConsumerNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsumerNavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsumerNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
