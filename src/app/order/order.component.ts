import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';


import { MenuItem } from './../restaurant-detail/menu-item/menu-item.model';
import { RadioOption } from './../shared/radio/radio-option.model';
import { CartItem } from './../restaurant-detail/shopping-cart/cart-Item.model';
import { OrderService } from './order.service';
import { Order, OrderItem } from './order.model';

import 'rxjs/add/operator/do'

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

  numberPattern = /^[0-9]*$/

  orderForm: FormGroup

  delivery: number = 8

  orderId: string //propriedade criada para guardar o id da compra e verificar se ela foi finalizada

  paymentOptions: RadioOption[] = [
    { label: 'Dinheiro', value: 'MON' },
    { label: 'Cartão de Débito', value: 'DEB' },
    { label: 'Cartão Refeição', value: 'REF' }
  ]

  constructor(private orderService: OrderService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      //passar as propriedades que vão ser os inputs
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      emailConfirmation: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      address: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      number: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
      optionalAddress: this.formBuilder.control(''),
      paymentOption: this.formBuilder.control('', [Validators.required])
    }, {validator: OrderComponent.equalsTo})
  }

  //função para verificar se os e-mails estão corretos
  static equalsTo(group: AbstractControl): {[key: string]: boolean}{
    const email = group.get('email') 
    const emailConfirmation = group.get('emailConfirmation')
    if(!email || !emailConfirmation){ //se nenhum existir no grupo, retorna undefined
      return undefined
    }
    if(email.value !== emailConfirmation.value){ //se forem diferentes, retorna um erro
      return{emailsNotMatch:true}
    }
    return undefined
  }

  //chama todas as funções implementas no serviço
  cartItems(): CartItem[] {
    return this.orderService.cartItems()
  }

  //total dos produtos
  itemsValue(): number{
    return this.orderService.itemsValue()
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

  isOrderCompleted(): boolean {
    return this.orderId !== undefined
  }

  checkOrder(order: Order){
  //para adicionar os itens do carrinho, é utilizado o map para "transformar" os itens de CartItem em OrderItem (que tem dois parametros)
    order.orderItems = this.cartItems()
      .map((item:CartItem) => new OrderItem(item.quantity, item.menuItem.id))
    this.orderService.checkOrder(order)//método para enviar os dados para a função que envia para API
    .do((orderId: string)=>{
      this.orderId = orderId})
    .subscribe((orderId:string)=>{
      this.router.navigate(['/order-summary'])
      this.orderService.clear()})
  }


}
