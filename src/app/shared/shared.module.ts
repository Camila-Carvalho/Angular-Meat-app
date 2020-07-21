import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';


import { InputComponent } from './input/input.component';
import { RadioComponent } from './radio/radio.component';
import { RatingComponent } from './rating/rating.component';
import { SnackbarComponent } from './messages/snackbar/snackbar.component';

import { LoginService } from './../security/login/login.service';
import { NotificationService } from './messages/notification.service';
import { OrderService } from './../order/order.service';
import { RestaurantsService } from './../restaurants/restaurants.service';
import { ShoppingCartService } from './../restaurant-detail/shopping-cart/shopping-cart.service';
import {LoggedInGuard} from '../security/loggedin.guard';
import { LeaveOrderGuard } from '../order/leave-order.guard';


@NgModule({
    declarations: [
        InputComponent,
        RadioComponent,
        RatingComponent,
        SnackbarComponent
    ],
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports:[
        CommonModule,
        FormsModule,
        InputComponent,
        RadioComponent,
        RatingComponent,
        ReactiveFormsModule,
        SnackbarComponent
    ]
})

export class SharedModule{ //se importar só SharedModule, vai somente o módulo principal

    static forRoot(): ModuleWithProviders{ //se chamar SharedModule.forRoot, os serviços/providers vão junto
        return {
            ngModule: SharedModule,
            providers:[
                LoginService,
                NotificationService,
                OrderService,
                RestaurantsService,
                ShoppingCartService,
                LoggedInGuard,
                LeaveOrderGuard
            ]
        }
    }
}