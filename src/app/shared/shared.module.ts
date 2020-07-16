import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';


import { InputComponent } from './input/input.component';
import { RadioComponent } from './radio/radio.component';
import { RatingComponent } from './rating/rating.component';

import { OrderService } from './../order/order.service';
import { RestaurantsService } from './../restaurants/restaurants.service';
import { ShoppingCartService } from './../restaurant-detail/shopping-cart/shopping-cart.service';

@NgModule({
    declarations: [
        InputComponent,
        RadioComponent,
        RatingComponent
    ],
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports:[
        InputComponent,
        RadioComponent,
        RatingComponent,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ]
})

export class SharedModule{ //se importar só SharedModule, vai somente o módulo principal

    static forRoot(): ModuleWithProviders{ //se chamar SharedModule.forRoot, os serviços/providers vão junto
        return {
            ngModule: SharedModule,
            providers:[
                OrderService,
                RestaurantsService,
                ShoppingCartService
            ]
        }
    }
}