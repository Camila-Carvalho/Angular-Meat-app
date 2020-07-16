import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';

import { NotificationService } from './../notification.service';

@Component({
  selector: 'mt-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],
  animations: [
    trigger('snack-visibility', [
      state('hidden', style({ //estado que se chama hidden
        opacity: 0, //não aparece
        bottom: '0px' //não é apresentado
      })),
      state('visible', style({//estado que se chama visible
        opacity: 1, //fica visivel
        botton: '30px' //com o tamanho de 30 pixel
      })),
      //definir transição: 1º passa de hidden pra visible e 2º passa de visible pra hidden
      transition('hidden => visible', animate('500ms 0s ease-in')),
      transition('visible => hidden', animate('500ms 0s ease-out'))
    ])
  ]
})

export class SnackbarComponent implements OnInit {

  message: string = 'Olá, Teste!'

  snackVisibility: string = 'hidden'

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.notificationService.notifier
      .do(message=>{
        this.message = message
        this.snackVisibility = 'visible'
      }).switchMap(message => Observable.timer(3000))
      .subscribe(timer => this.snackVisibility = 'hidden')

    /* FAZER DESTA FORMA ACABA ENVIANDO VÁRIAS NOTIFICAÇÕES COM O MESMO TEMPO E BUGANDO ELAS, POR ISSO PRECISA
    SER FEITO CONFORMA ACIMA, PARA NÃO SOBRECARREGAR DE MENSAGENS COM TEMPOS IGUAIS
        this.notificationService.notifier.subscribe(message => {
          this.message = message
          this.snackVisibility = 'visible'
          Observable.timer(3000).subscribe(timer => this.snackVisibility = 'hidden') //tempo para ele voltar a hidden
        })
      }
    */
  }
}