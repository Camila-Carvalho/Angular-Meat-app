import { MenuItem } from './../restaurant-detail/menu-item/menu-item.model';
import { Component, OnInit } from '@angular/core';
import { RadioOption } from './../shared/radio/radio-option.model';
import { CartItem } from './../restaurant-detail/shopping-cart/cart-Item.model';
import { OrderService } from './order.service';
import { Order, OrderItem } from './order.model';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  delivery: number = 8

  paymentOptions: RadioOption[] = [
    { label: 'Dinheiro', value: 'MON' },
    { label: 'Cartão de Débito', value: 'DEB' },
    { label: 'Cartão Refeição', value: 'REF' }
  ]

  constructor(private orderService: OrderService) { }

  ngOnInit() {
  }

  //chama todas as funções implementas no serviço
  cartItems(): CartItem[] {
    return this.orderService.cartItems()
  }

  //total dos produtos
  itemsValue(item: CartItem){
    return this.orderService.itemsValue(item)
  }

  increaseQty(item: CartItem) {
    this.orderService.increaseQty(item)
  }

  decreaseQty(item: CartItem) {
    this.orderService.decreaseQty(item)
  }

  remove(item: CartItem) {
    this.orderService.remove(item)
  }

  checkOrder(order: Order){
  //para adicionar os itens do carrinho, é utilizado o map para "transformar" os itens de CartItem em OrderItem (que tem dois parametros)
    order.orderItems = this.cartItems()
      .map((item:CartItem) => new OrderItem(item.quantity, item.menuItem.id))
    this.orderService.checkOrder(order)//método para enviar os dados para a função que envia para API
    .subscribe((orderId:string)=>{console.log(`Compra concluída: ${orderId}`)
    this.orderService.clear()
    })
    console.log(order)
  }
}
