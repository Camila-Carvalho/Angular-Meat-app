import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RestaurantsService } from './../restaurants/restaurants.service';
import { Restaurant } from '../restaurants/restaurant/restaurant.model'

@Component({
  selector: 'mt-restaurant-detail',
  templateUrl: './restaurant-detail.component.html'
})
export class RestaurantDetailComponent implements OnInit {

  restaurant: Restaurant
  //construtor contendo o serviço de erestaurante e a rota de um restaurante especifico
  constructor(private restaurantsService: RestaurantsService,
              private route: ActivatedRoute) { }
  //método para apresentar um restaurante especifico correspondente ao id passado para a rota
  ngOnInit() {
    this.restaurantsService.restaurantById(this.route.snapshot.params['id'])
    .subscribe(restaurant => this.restaurant = restaurant)
  }

}
