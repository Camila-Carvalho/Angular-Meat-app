import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do'

import { User } from './user.model'
import { MEAT_API } from './../../app.api';

@Injectable()
export class LoginService{

    user: User

    constructor(private http: HttpClient, private router: Router){
    }

    //método para outras partes da aplicação saber se possui um usuário logado
    isLoggedIn(): boolean{
        return this.user !== undefined
    }

    //método de login que irá se comunicar com o backend
    login(email: string, password: string):Observable<User> {
        return this.http.post<User>(`${MEAT_API}/login`, {email: email, password: password})
                        .do(user=>this.user = user)
    }

    handleLogin(){
        this.router.navigate(['/login'])
    }
}