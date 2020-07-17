import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/distinctUntilChanged'

import { Restaurant } from './restaurant/restaurant.model';
import { RestaurantsService } from './restaurants.service';

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  animations:[
    trigger('toggleSearch', [
      state('hidden', style({
        opacity: 0,
        "max-height": "0px"
      })),
      state('visible', style({
        opacity: 1,
        "max-height": "70px",
        "margin-top": "10px"
      })),
      transition('* => *', animate('250ms 0s ease-in-out'))
    ])
  ]
})
export class RestaurantsComponent implements OnInit {

  searchBarState = 'hidden'
  restaurants: Restaurant[]
  
  searchForm: FormGroup
  searchControl: FormControl


  constructor( private restaurantsService: RestaurantsService, 
               private fb: FormBuilder) { }

  ngOnInit() {

    this.searchControl = this.fb.control('')
    this.searchForm = this.fb.group({
      searchControl: this.searchControl
    })
    //para ouvir o que está sendo ditado no console:
    //this.searchControl.valueChanges.subscribe(searchTeam => console.log(searchTeam))
    this.searchControl.valueChanges
      .debounceTime(500) //tempo para de intervalo para procura de cada caractere
      .distinctUntilChanged() //utilizado para caso pesquise o que já está na barra de pesquisa, ele não vá até o servidor buscar novamente
      .switchMap(searchTeam => this.restaurantsService.restaurants(searchTeam))
      .subscribe(restaurants => this.restaurants = restaurants)


    this.restaurantsService.restaurants().subscribe(restaurants => this.restaurants = restaurants) //Necessário incluir o subscribe para a requisição na API ser feita
  }

  toggleSearch(){
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden'
  }

}
