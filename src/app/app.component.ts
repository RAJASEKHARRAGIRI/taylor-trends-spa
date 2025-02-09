import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuBarComponent } from "./Components/home-page/menu-bar/menu-bar.component";
import { CategoriesComponent } from "./Components/home-page/categories/categories.component";
import { TrendingComponent } from "./Components/home-page/trending/trending.component";
import { FooterComponent } from './Components/home-page/footer/footer.component';
import { SideDrawyerComponent } from "./Components/common/Components/side-drawyer/side-drawyer.component";
import { ProductsListPageComponent } from "./Components/products-list-page/products-list-page.component";
import { LoginFormComponent } from './Components/common/Components/login-form/login-form.component';
import { LoginService } from './Components/common/Services/login.service';
import { Popover } from 'bootstrap';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MenuBarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit{

  title = 'taylor-trends-spa';

  ngOnInit(): void {
    // Array.from(document.querySelectorAll('button[data-bs-toggle="popover"]'))
    // .forEach(popoverNode => new Popover(popoverNode))
  }
}
