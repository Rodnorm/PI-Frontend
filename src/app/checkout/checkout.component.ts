import { Component, OnInit } from '@angular/core';
import { GeneralServices } from 'src/app/services/services';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CorreiosService } from '../services/correios.services';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent implements OnInit {
  protocolo;
  valorFrete: number;
  itens = this.GS.carrinho;
  isCardMethod: boolean = false;
  tipoPagamento: string;

  // Criação de um usuário fictício. Para teste de checkout
  // implementação do usuário real deve ser feita no onInit
  user = {
    cep:'04890550',
    rua:'Rua da Paz',
    numero:'14',
    complemento:'Apartamento B'
  }
  checkoutFormAddress: FormGroup;
  checkoutFormCard: FormGroup;
  constructor(
    private products: ProductsComponent, 
    private GS: GeneralServices,
    private formBuilder: FormBuilder,
    private correiosService: CorreiosService
  ) { }

  ngOnInit() {
    //pega os dados to usuário
    // usuario
    this.createFormGroup(); //passa os dados do usuario
  }
  setFrete(frete) {
    if (frete == 'sedex') {
      this.valorFrete = parseFloat(this.correiosService.correiosInfo[frete].valor.replace(',','.'));
      return; 
    }
    if (frete == 'PAC') {
      this.valorFrete = parseFloat(this.correiosService.correiosInfo[frete].valor.replace(',','.'));
      return;
    }

  }
  private createFormGroup() {
    //verifica se há usuário
    
    /**
     *  exemplo de código para quando houver o objeto usuário
     *  if (user) {
     *     this.checkoutFormAddress = this.formBuilder.group({
              'rua' : [user.rua, Validators.required],
              'numero' : [user.numero, Validators.required],
              'complemento' : [user.complemento, Validators.required],
              'cep' : [user.cep, Validators.required],
        });
     * 
     * }
     * 
     */

    this.checkoutFormAddress = this.formBuilder.group({
      'rua' : [null, Validators.required],
      'numero' : [null, Validators.required],
      'complemento' : [null],
      'cep' : [null, Validators.required],
    });

    
  }
  private createCardFormGroup() {
    this.checkoutFormCard = this.formBuilder.group({
      'numero':[null, Validators.compose([Validators.required])],
      'cvv':[null, Validators.compose([Validators.required])],
      'data_expiracao':[null, Validators.compose([Validators.required])],
      'nome_titular':[null, Validators.compose([Validators.required])]
    });
  }

  private cardToggle(i?) {
    
    if (i) {
      this.isCardMethod = true;
      this.tipoPagamento = 'cartao'
      return;
    }

    if (this.checkoutFormCard) {
      this.checkoutFormCard.reset();      
    }
    this.tipoPagamento = 'boleto'
    this.isCardMethod = false;
  }

  private sendData() {

    for (let i = 0; i < this.itens.length; i++) {

      Object.keys(this.itens[i]).forEach( key => {
        if (key == 'nome' || key == 'subtotal') {
          delete this.itens[i][key];
        }
      });
    }

    let sendObj = { 
      idCliente: 1,
      enderecoEntrega: `${this.checkoutFormAddress.value.rua}, ${this.checkoutFormAddress.value.numero}, `,
      status: 'aguardando pagamento',
      tipoPagamento: this.tipoPagamento,
      itens: this.itens, 
      valorFrete: this.valorFrete
    }
    this.GS.postOrder(JSON.stringify(sendObj))
    .subscribe( response => {
      debugger
      if (response.response.returnMsg == 'Success.') {
        this.protocolo = response.data;
        alert(`Anote seu protocolo ${this.protocolo}`)
      }else {
        alert('Algo deu errado. ;(')
      }
    });

  }
}