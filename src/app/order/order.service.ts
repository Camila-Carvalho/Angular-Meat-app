import { Injectable } from "@angular/core";

import { CartItem } from './../restaurant-detail/shopping-cart/cart-Item.model';

import { ShoppingCartService } from './../restaurant-detail/shopping-cart/shopping-cart.service';



@Injectable() //1---> pois será necessário injetar o serviço de shopping cart
export class OrderService{

    constructor(private cartService: ShoppingCartService){ //2---> Adicionar o serviço de shoppingCartService
    }

    cartItems(): CartItem[]{//3---> Função para mostrar os itens
        return this.cartService.items//para os itens do carrinho
    }

    increaseQty(item: CartItem){ //4--->Chama a função de incremento do serviço de carrinho
        this.cartService.increaseQty(item)
    }

    decreaseQty(item: CartItem){ //5---> Chama a função de decremento do serviço de carrinho
        this.cartService.decreaseQty(item)
    }

    remove(item: CartItem){
        this.cartService.removeItem(item)
    }
//Depois de pronto necessário expor no componente
}