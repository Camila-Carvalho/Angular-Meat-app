import { Routes } from '@angular/router'

import { HomeComponent } from './home/home.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { AboutComponent } from './about/about.component';

export const ROUTES: Routes = [
    {path: '', component: HomeComponent}, //quando não especificar caminho, pega o componente principal
    {path: 'restaurants', component: RestaurantsComponent},
    {path: 'about', component: AboutComponent}
]