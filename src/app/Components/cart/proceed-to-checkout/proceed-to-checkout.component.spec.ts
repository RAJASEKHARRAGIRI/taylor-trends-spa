import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProceedToCheckoutComponent } from './proceed-to-checkout.component';

describe('ProceedToCheckoutComponent', () => {
  let component: ProceedToCheckoutComponent;
  let fixture: ComponentFixture<ProceedToCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProceedToCheckoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProceedToCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
