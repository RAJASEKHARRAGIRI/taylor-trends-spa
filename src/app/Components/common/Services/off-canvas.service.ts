import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { OffCanvasSideBarComponent } from '../Components/off-canvas-side-bar/off-canvas-side-bar.component';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class OffCanvasService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  private offcanvasRef!: OffCanvasSideBarComponent;

  setOffcanvasRef(offcanvas: OffCanvasSideBarComponent): void {
    this.offcanvasRef = offcanvas;
  }

  async open(component: any, title: string = 'Offcanvas', data?: any): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      this.offcanvasRef.title = title;
      this.offcanvasRef.loadComponent(component, data);
  
      const offcanvasElement = document.getElementById('dynamicOffcanvas');
      if (offcanvasElement) {
        const { Offcanvas } = await import('bootstrap');
        const bootstrapOffcanvas = new Offcanvas(offcanvasElement);
        bootstrapOffcanvas.show();
      }
    }
  }
}
