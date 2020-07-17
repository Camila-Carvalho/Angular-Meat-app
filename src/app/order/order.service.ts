import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map'
import { MEAT_API } from './../app.api';

import { Order, OrderItem } from "./order.model";
import { CartItem } from './../restaurant-detail/shopping-cart/cart-Item.model';
import { ShoppingCartService } from './../restaurant-detail/shopping-cart/shopping-cart.service';



@Injectable() //1---> pois será necessário injetar o serviço de shopping cart
export class OrderService {

    constructor(private cartService: ShoppingCartService, private http: HttpClient) { //2---> Adicionar o serviço de shoppingCartService
    }

    cartItems(): CartItem[] {//3---> Função para mostrar os itens
        return this.cartService.items//para os itens do carrinho
    }

    increaseQty(item: CartItem) { //4--->Chama a função de incremento do serviço de carrinho
        this.cartService.increaseQty(item)
    }

    decreaseQty(item: CartItem) { //5---> Chama a função de decremento do serviço de carrinho
        this.cartService.decreaseQty(item)
    }

    remove(item: CartItem) {
        this.cartService.removeItem(item)
    }

    itemsValue() {
        return this.cartService.total()
    }

    clear(){
        this.cartService.clear()
    }

    //método para enviar para API.JSON
    checkOrder(order: Order): Observable<string>{
        return this.http.post<Order>(`${MEAT_API}/orders`, order)
            .map(order => order.id)
    }
    //Depois de pronto necessário expor no componente
}