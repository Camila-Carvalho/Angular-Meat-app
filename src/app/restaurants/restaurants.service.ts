import { Injectable } from "@angular/core" //2 ---> Importa o injectable pra poder usar a API
import {Http} from '@angular/http' //4 ---> Importa o http

import{ Observable } from 'rxjs/Observable' //7 ---> Importar o Observable
import 'rxjs/add/operator/map' //8 ---> Importar para poder realizar o mapeamento dos dados que estão na API
import 'rxjs/add/operator/catch' //para tratamento de erro

import { Restaurant } from "./restaurant/restaurant.model"


import { MEAT_API } from '../app.api'; //1 ---> Importa a API
import { ErrorHandler } from './../app.error-handler';

@Injectable() //3 ---> Define o injectable antes da classe de serviço
export class RestaurantsService{
  
      constructor(private http: Http){} //5 ---> Coloca um parametro http do tipo Http no contrutor

      restaurants(): Observable<Restaurant[]> { //6 --->Necessário colocar Observable porque na API está observable e no app esta um array de restaurante
        return this.http.get(`${MEAT_API}/restaurants`)
          .map(response => response.json()) //9 ---> pega o que está na API/restaurants que está mapeado no json
          .catch(ErrorHandler.handleError)
      }

}