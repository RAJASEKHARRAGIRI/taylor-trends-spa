import { Routes } from '@angular/router';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { ProductsListPageComponent } from './Components/products-list-page/products-list-page.component';
import { PageNotFoundComponent } from './Components/common/Components/page-not-found/page-not-found.component';
import { ProductPageComponent } from './Components/product-page/product-page.component';
import { ViewCartComponent } from './Components/cart/view-cart/view-cart.component';
import { OrderTrackingComponent } from './Components/order-tracking/order-tracking.component';
import { AddressComponent } from './Components/address/address.component';

export const routes: Routes = [
    {path:'', component: HomePageComponent},
    {path:'home', component: HomePageComponent},
    {path:'viewproducts', component: ProductsListPageComponent},
    {path:'viewproduct/:id', component: ProductPageComponent},
    {path:'viewcart', component: ViewCartComponent},
    {path:'ordertracking', component: OrderTrackingComponent},
    {path:'address', component: AddressComponent},
    {path:'notfound', component: PageNotFoundComponent},
];
