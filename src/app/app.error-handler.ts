import { Injectable, Injector, ErrorHandler, NgZone } from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';

import { NotificationService } from './shared/messages/notification.service';
import { LoginService } from './security/login/login.service';

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/throw'

@Injectable()
export class AplicationErrorHandler extends ErrorHandler {

    constructor(private ns: NotificationService, 
                private injector: Injector,
                private zone: NgZone){
        super()
    }

    handleError(errorResponse: HttpErrorResponse | any){
        if(errorResponse instanceof HttpErrorResponse){
            const message = errorResponse.error.message
            this.zone.run(()=>{ //aqui foi construida a zona, porque o Angular não estava conseguindo identificar e...
                //...processar estas mensagens de forma adequada, então foi contruida uma zona
                switch(errorResponse.status){
                    case 401:
                        this.injector.get(LoginService).handleLogin()
                        break;
                    case 403:
                        this.ns.notify(message || 'Não Autorizado.')
                        break;
                    case 404:
                        this.ns.notify(message || 'Recurso não encontrado. Verifique o console para mais detalhes.')
                        break;
                }
            })
        }
        super.handleError(errorResponse)
    }
}