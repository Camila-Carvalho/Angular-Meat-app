import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { LoginService } from './login.service';
import { NotificationService } from './../../shared/messages/notification.service';

@Component({
  selector: 'mt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  navigateTo: string

  constructor(private fb: FormBuilder,
    private loginService: LoginService,
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required]),
    })
    this.navigateTo = this.activatedRoute.snapshot.params['to'] || atob('/') //se alguém chamar e não tiver uma rota, ele navega para raiz (/)
  }

  login() {
    this.loginService.login(this.loginForm.value.email,
      this.loginForm.value.password) //Subscribe passa 3 respostas
      .subscribe(user => this.notificationService.notify(`Bem vindo(a), ${user.name}!`), //a resposta se der certo
        response => this.notificationService.notify(response.error.message), //a resposta em caso de erro
        ()=>{
          this.router.navigate([btoa(this.navigateTo)])//resposta para quando o observable terminar
        })
  }

}
