import { Component } from '@angular/core';
import { CategoriesComponent } from "./categories/categories.component";
import { TrendingComponent } from "./trending/trending.component";

@Component({
  standalone: true,
  selector: 'home-page',
  imports: [CategoriesComponent, TrendingComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
