import { Injectable } from "@angular/core";

import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'
import { MEAT_API } from './../app.api';

import { Order, OrderItem } from "./order.model";
import { CartItem } from './../restaurant-detail/shopping-cart/cart-Item.model';
import { ShoppingCartService } from './../restaurant-detail/shopping-cart/shopping-cart.service';



@Injectable() //1---> pois será necessário injetar o serviço de shopping cart
export class OrderService {

    constructor(private cartService: ShoppingCartService, private http: Http) { //2---> Adicionar o serviço de shoppingCartService
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
        const headers = new Headers() //necessário informar o tipo do conteúdo que está passando, por isso é necessário o header
        headers.append('Content-Type', 'aplication/json') //no header é necessário passar o nome do header e o valor dele
        return this.http.post(`${MEAT_API}/orders`, JSON.stringify(order), new RequestOptions({headers: headers})).map(response=>response.json()).map(order => order.id)
        /*
        return this.http.post ---> retorna a compra
        (`${MEAT_API}/orders`, ---> coloca na pasta orders
        JSON.stringify(order)) ---> objeto que vai ser mandado, está em stringify porque em http a representação é textual 
        new RequestOptions({headers: headers}) ---> aqui é pra passar os headers
        */
    }
    //Depois de pronto necessário expor no componente
}