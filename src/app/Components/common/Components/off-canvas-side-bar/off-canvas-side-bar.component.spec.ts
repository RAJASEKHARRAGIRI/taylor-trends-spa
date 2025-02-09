import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffCanvasSideBarComponent } from './off-canvas-side-bar.component';

describe('OffCanvasSideBarComponent', () => {
  let component: OffCanvasSideBarComponent;
  let fixture: ComponentFixture<OffCanvasSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffCanvasSideBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffCanvasSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
