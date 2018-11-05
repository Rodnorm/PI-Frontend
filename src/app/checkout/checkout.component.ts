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
    this.createFormGroup();
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
    
    if (this.GS.testScenario) {
      this.checkoutFormAddress = this.formBuilder.group({
        'rua' : ['Rua Y', Validators.required],
        'numero' : ['9', Validators.required],
        'complemento' : ['Apartamento B', Validators.required],
        'cep' : ['30120-000', Validators.required],
      });
      return;
    }
    this.checkoutFormAddress = this.formBuilder.group({
      'rua' : [null, Validators.required],
      'numero' : [null, Validators.required],
      'complemento' : [null, Validators.required],
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