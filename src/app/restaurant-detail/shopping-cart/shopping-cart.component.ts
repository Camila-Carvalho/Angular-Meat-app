import { ShoppingCartService } from './shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'mt-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  animations: [
    trigger('row', [
      state('ready', style({opacity: 1})),
      transition('void => ready', animate('300ms 0s ease-in', keyframes([ //desenho de como fica animação
        style({opacity:0, transform: 'translateX(-30px)', offset:0}),   // [obj]- - - - - - - - - -
        style({opacity:0.8, transform: 'translateX(10px)', offset:0.8}),//  - - - - - - - - - [obj]
        style({opacity:1, transform: 'translateX(0px)', offset:1}),     //  - - - - - - - [obj] - -
      ]))),
      transition('ready => void', animate('300ms 0s ease-in', keyframes([ //desenho de como fica animação
        style({opacity:1, transform: 'translateX(0px)', offset:0}),     //  - - - - - - - [obj] - -
        style({opacity:0.8, transform: 'translateX(-10px)', offset:0.2}),  //  - - - - - - - - - [obj]
        style({opacity:0, transform: 'translateX(30px)', offset:1}),       // [obj]- - - - - - - - - -
      ])))
    ])
  ]
})
export class ShoppingCartComponent implements OnInit {

  rowState = 'ready'

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {

  }

  clear(){
    return this.shoppingCartService.clear();
  }

  removeItem(item: any){
    this.shoppingCartService.removeItem(item);
  }

  addItem(item: any){
    this.shoppingCartService.addItem(item);
  }

  items(): any[] {
    return this.shoppingCartService.items;
  }

  total(): number {
    return this.shoppingCartService.total()
  }

}
