import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentRef, Inject, Input, OnDestroy, OnInit, PLATFORM_ID, ViewChild, ViewContainerRef } from '@angular/core';
import $ from "jquery";

declare var jQuery:any;
@Component({
  standalone: true,
  selector: 'off-canvas-side-bar',
  imports: [],
  templateUrl: './off-canvas-side-bar.component.html',
  styleUrl: './off-canvas-side-bar.component.css',
  changeDetection: ChangeDetectionStrategy.Default // Set to default
})
export class OffCanvasSideBarComponent implements OnDestroy {
  title: string = 'Offcanvas'; // Title for the offcanvas
  @ViewChild('dynamicContent', { read: ViewContainerRef })
  dynamicContent!: ViewContainerRef;
  price: string ="";
  
  private componentRef!: ComponentRef<any>;
  constructor(private cdr: ChangeDetectorRef) {}

  public loadComponent(component: any, data?: any): void {
    this.dynamicContent.clear(); // Clear any previously loaded component
    this.componentRef = this.dynamicContent.createComponent(component);
    if (data) {
      Object.assign(this.componentRef.instance, data); // Pass data to the dynamic component
      this.price = data?.price;
      this.cdr.detectChanges(); // Trigger change detection
    }
  }

  onClose(): void {
    location.reload();
  }

  ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
}