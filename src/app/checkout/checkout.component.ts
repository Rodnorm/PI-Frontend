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
  private keyToken = 'Token';
  private keyLogin = 'Login';
  private keyCustomer = 'Customer';
  private success: boolean = false;
  private loader: boolean = false;
  protocolo;
  valorFrete: number;
  itens = this.GS.carrinho;
  isCardMethod: boolean = false;
  tipoPagamento: string;

  checkoutFormAddress: FormGroup;
  checkoutFormCard: FormGroup;
  constructor(
    public products: ProductsComponent,
    private GS: GeneralServices,
    private formBuilder: FormBuilder,
    public correiosService: CorreiosService
  ) { }

  ngOnInit() {
    //pega os dados to usuário
    // usuario
    this.createFormGroup(); //passa os dados do usuario
  }
  setFrete(frete) {
    if (frete == 'sedex') {
      this.valorFrete = parseFloat(this.correiosService.correiosInfo[frete].valor.replace(',', '.'));
      return;
    }
    if (frete == 'PAC') {
      this.valorFrete = parseFloat(this.correiosService.correiosInfo[frete].valor.replace(',', '.'));
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
      'rua': [null, Validators.required],
      'numero': [null, Validators.required],
      'complemento': [null],
      'cep': [null, Validators.required],
      'uf': [null],
      'cidade': [null],
      'bairro': [null]
    });


  }
  public createCardFormGroup() {
    this.checkoutFormCard = this.formBuilder.group({
      'numero': [null, Validators.compose([Validators.required])],
      'cvv': [null, Validators.compose([Validators.required])],
      'data_expiracao': [null, Validators.compose([Validators.required])],
      'nome_titular': [null, Validators.compose([Validators.required])]
    });
  }

  public cardToggle(i?) {

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

  public sendData() {

    let sendObj = this.createObj();
    let token = localStorage.getItem(this.keyToken);
    let login = localStorage.getItem(this.keyLogin);
    this.loader = true;
    this.GS.postOrder(JSON.stringify(sendObj), token)
      .subscribe(response => {
        console.log(response);
        this.success = true;
        this.loader = false;
        if (response.body.response.returnMsg == 'Success.') {
          this.protocolo = response.body.data;
          alert(`Anote seu protocolo ${this.protocolo}`)
        } else {
          alert('Algo deu errado. ;(')
        }
      });

  }

  createObj() {
    let itens = [];

    for (let i = 0; i < this.itens.length; i++) {
      itens.push({
        produto: {
          idProduto: this.itens[i].idProduto
        },
        quantidade: this.itens[i].quantidade,
        preco: this.itens[i].preco
      });
    }

    return {
      idCliente: localStorage.getItem(this.keyCustomer),
      logradouro: this.checkoutFormAddress.value.rua,
      numero: this.checkoutFormAddress.value.numero,
      complemento: this.checkoutFormAddress.value.complemento,
      cep: this.checkoutFormAddress.value.cep.replace('-', ''),
      bairro: this.checkoutFormAddress.value.bairro,
      cidade: this.checkoutFormAddress.value.cidade,
      uf: this.checkoutFormAddress.value.uf,
      status: 'aguardando pagamento',
      tipoPagamento: this.tipoPagamento,
      itens
    }
  }
}