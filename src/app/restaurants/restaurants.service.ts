import { Injectable } from "@angular/core" //2 ---> Importa o injectable pra poder usar a API
import {HttpClient, HttpParams} from '@angular/common/http' //4 ---> Importa o http

import{ Observable } from 'rxjs/Observable' //7 ---> Importar o Observable
import 'rxjs/add/operator/map' //8 ---> Importar para poder realizar o mapeamento dos dados que estão na API
import 'rxjs/add/operator/catch' //para tratamento de erro

import { Restaurant } from "./restaurant/restaurant.model"
import { MenuItem } from './../restaurant-detail/menu-item/menu-item.model';


import { MEAT_API } from '../app.api'; //1 ---> Importa a API
import { ErrorHandler } from './../app.error-handler';

@Injectable() //3 ---> Define o injectable antes da classe de serviço
export class RestaurantsService{
  
      constructor(private http: HttpClient){} //5 ---> Coloca um parametro http do tipo Http no contrutor
      
      //método para apresentar a lista de restaurantes
      restaurants(search?: string): Observable<Restaurant[]> { //6 --->Necessário colocar Observable porque na API está observable e no app esta um array de restaurante
        let params: HttpParams = undefined
        if(search){
          params = new HttpParams().set('q', search)
        }
        return this.http.get<Restaurant[]>(`${MEAT_API}/restaurants`, {params: params})
      }

      //método pra apresentar somente um restaurante com base no id dele
      restaurantById(id: string): Observable<Restaurant> {
        return this.http.get<Restaurant>(`${MEAT_API}/restaurants/${id}`)
      }

      //método para apresentar os comentários de um restaurante
      reviewsOfRestaurant(id: string): Observable<any>{
        return this.http.get(`${MEAT_API}/restaurants/${id}/reviews`)
      }

      menuOfRestaurant(id: string): Observable<MenuItem[]>{
        return this.http.get<MenuItem[]>(`${MEAT_API}/restaurants/${id}/menu`)
      }

}