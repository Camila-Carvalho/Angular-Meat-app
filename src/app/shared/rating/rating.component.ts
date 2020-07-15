import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mt-rating',
  templateUrl: './rating.component.html'
})
export class RatingComponent implements OnInit {

  @Output() rated = new EventEmitter<number>() //aqui é para criar o evento de apresentar a mensagem após avaliação

  rates: number [] = [1,2,3,4,5] //array de possíveis avaliações

  rate: number = 0 //valor inicial da avaliação

  previousRate: number //"variável utilizada para "prever" uma avaliação sem setar ela de fato

  constructor() { }

  ngOnInit() {
  }

  setRate (r: number){
    this.rate = r
    this.previousRate = undefined
    this.rated.emit(this.rate)
  }

  setTemporaryRate(r: number){
    if(this.previousRate === undefined){
      this.previousRate = this.rate
    }
    this.rate = r
  }

  clearTemporaryRate(){
    if(this.previousRate !== undefined){
      this.rate = this.previousRate
      this.previousRate = undefined
    }
  }

}
