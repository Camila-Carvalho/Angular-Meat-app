import { Routes } from '@angular/router'

import { LoginComponent } from './security/login/login.component';

import { HomeComponent } from './home/home.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { MenuComponent } from './restaurant-detail/menu/menu.component';
import { ReviewsComponent } from './restaurant-detail/reviews/reviews.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { NotFoundComponent } from './not-found/not-found.component';


export const ROUTES: Routes = [
    {path: '', component: HomeComponent}, //quando não especificar caminho, pega o componente principal
    {path: 'login', component: LoginComponent},
    {path: 'restaurants', component: RestaurantsComponent},
    {path: 'restaurants/:id', component: RestaurantDetailComponent,//":id" é para ele direcionar para um id variável
        children: [ //children é usado para ter "menus" dentro do "menu", por exemplo, é necessário acessar o restaurante para ver o menu e as avaliações
            {path: '', redirectTo:'menu', pathMatch: 'full'}, //aqui é para ele iniciar sempre na "aba" menu
            {path: 'menu', component: MenuComponent}, //aqui é para navegar em menu
            {path: 'reviews', component: ReviewsComponent} //aqui é para navegar em avaliações
        ]
    },
    {path: 'order', loadChildren: './order/order.module#OrderModule'},
    {path: 'order-summary', component: OrderSummaryComponent},
    {path: 'about', loadChildren: './about/about.module#AboutModule'},
    {path: '**', component: NotFoundComponent} //última rota para o sistema acessar quando não encontrar uma URL
]