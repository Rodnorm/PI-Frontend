import { Component, OnInit } from '@angular/core';
import { GeneralServices } from 'src/app/services/services';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  carrinho = this.GS.carrinho;
  isCardMethod: boolean = false;
  user = {
    cep:'04890550',
    rua:'Rua da Paz',
    numero:'14',
    complemento:'Apartamento B'
  }
  checkoutForm: FormGroup;
  checkoutFormCard: FormGroup;
  constructor(
    private GS: GeneralServices,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    //pegar todo o carrinho
    //pega os dados to usuário
    this.createFormGroup();
    
  }
  private createFormGroup(){
    this.checkoutForm = this.formBuilder.group({
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'senha': [null, Validators.compose([Validators.minLength(8),Validators.required, Validators.maxLength(28)])],
      'nome' : [null, Validators.compose([Validators.required, Validators.minLength(2)])],
      'rua' : [null, Validators.required],
      'numero' : [null, Validators.required],
      'complemento' : [null, Validators.required],
      'cep' : [null, Validators.required],
    });
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
      return;
    }
    this.isCardMethod = false;
    
  }

}
