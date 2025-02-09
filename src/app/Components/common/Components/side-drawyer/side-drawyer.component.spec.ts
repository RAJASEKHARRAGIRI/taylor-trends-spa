import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideDrawyerComponent } from './side-drawyer.component';

describe('SideDrawyerComponent', () => {
  let component: SideDrawyerComponent;
  let fixture: ComponentFixture<SideDrawyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideDrawyerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideDrawyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
