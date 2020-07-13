import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { RadioOption } from './radio-option.model';

@Component({
  selector: 'mt-radio',
  templateUrl: './radio.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RadioComponent),
    multi: true
  }]
})
export class RadioComponent implements OnInit, ControlValueAccessor {

  @Input() options: RadioOption[]
  
  value: any
  onChange: any

  constructor() { }

  ngOnInit() {
  }

  setValue(value: any){
    this.value = value
    this.onChange(this.value) //colocado o onchange aqui para chamar a função para guardar o valor
  }

    /*
    FUNÇÕES OBRIGATÓRIAS DA INTERFACE CONTROLVALUEACCESSOR
    */

    /*writeValue: Grava um novo valor no elemento, é utilizado quando as diretivas pracisam passar um valor para o componente*/
    writeValue(obj: any): void{
      this.value = obj
    }
    
    /*registerOnChange: Função chamada quando o valor do controle é alterado na interface do usuário.*/
    registerOnChange(fn: any): void{
      this.onChange = fn //sempre que mudar o valor, chama esta função
    }
    
    /*registerOnTouched: Registra se o usuário entrou neste componente*/
    registerOnTouched(fn: any): void{}
   
   
    /*@param isDisabled*/
    /*setDisabledState: Registra se o usuário entrou neste componente. Função chamada pela API de formulários quando o status do controle é alterado para 'DISABLED'. Dependendo do status, ele ativa ou desativa o elemento DOM apropriado.*/
    setDisabledState?(isDisabled: boolean): void{}


}
