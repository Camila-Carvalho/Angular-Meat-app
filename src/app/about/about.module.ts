import { NgModule } from '@angular/core'; // 2 ---> Importar a biblioteca da anotação NgModel
import { RouterModule, Routes } from '@angular/router'; //6 ---> DEPOIS DE AJUSTAR A ROTA NO MÓDULO PRINCIPAL, importar a biblioteca de rotas aqui

import { AboutComponent } from './about.component'; //5 ---> Importar as bibliotecas das declarações

//*COMO ESTE MÓDULO É PEQUENO, AS ROTAS FORAM COLOCADAS AQUI*
const ROUTES: Routes = [ //7 ---> Criar uma constante do tipo array para informar as rotas
    {path: '', component: AboutComponent} //8 ---> Informar as rotas
]


@NgModule({ //3 ---> Colocar a anotação NgModule
    declarations:[ //4 ---> Colocar as declarações
        AboutComponent
    ],
    imports:[ //9 ---> Criar os imports, para importar as rotas
       RouterModule.forChild(ROUTES)//10 ---> Informar o módulo de rotas do módulo filho, o ABOUT passando a constante de rotas do módulo filho
    ]
})


export class AboutModule{ //1 ---> Criar a classe do módulo
}