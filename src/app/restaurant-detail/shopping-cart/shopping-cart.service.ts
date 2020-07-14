import { MenuItem } from './../menu-item/menu-item.model';
import { CartItem } from './cart-Item.model';

export class ShoppingCartService{

    items: CartItem[] = []

    clear(){
        this.items = []
    }

    //adiciona um item do menu no carrinho
    addItem(item:MenuItem){
        //O método find() retorna se o parametro passado pra ele (mItem) é igual ao item que esta comparando
        let foundItem = this.items.find((mItem) => mItem.menuItem.id === item.id)
        if(foundItem){
            this.increaseQty(foundItem)
            //foundItem.quantity = foundItem.quantity + 1 //se encontrar o item, acrescenta 1
        }
        else{
            this.items.push(new CartItem(item)) //se não, inclui no carrinho
        }

    }

    //acrescentar a quantidade do item
    increaseQty(item: CartItem){
        item.quantity = item.quantity + 1
    }

    //retirar uma quantidade do item
    decreaseQty(item: CartItem){
        item.quantity = item.quantity - 1
        if(item.quantity === 0){
            this.removeItem(item)
        }
    }

    //remove um item do carrinho no carrinho
    removeItem(item:CartItem){
        this.items.splice(this.items.indexOf(item),1)
    }



    total(): number {
        return this.items.map(item => item.value()).reduce((prev, value) => prev + value, 0)
        //1º faz o map para substituir o cartItem pelo valor do cartItem (valor qjá é a quantidade + preço, porque value é a função do Cart-Item)
        //2º a função reduce vai acumulando o valor total, ela pega o valor anterior (prev - acumulador) e soma com o valor do item (value)
        //3º o zero é para caso não tenha nenhum valor, ele deixar com valor 0 no total
    }

}