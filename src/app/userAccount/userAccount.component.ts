import { GeneralServices } from './../services/services';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-pedidos',
  templateUrl: './userAccount.component.html',
  styleUrls: ['./userAccount.component.scss']
})
export class PedidosComponent implements OnInit {

  private keyToken = 'Token';
  private keyLogin = 'Login';
  private orders;
  private loader:boolean = false;
  updateInfo: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private GS: GeneralServices
  ) { }

  ngOnInit() {

    this.getUser();
    this.getOrders();
  }

  public getUser() {


    this.loader = true;
    let token = localStorage.getItem(this.keyToken);
    let login = localStorage.getItem(this.keyLogin);

    this.GS.getUserDetails(login, token)
      .subscribe(data => {
        let userData = data['data'];
        this.updateInfo = this.formBuilder.group({
          'nome': [userData.nome, Validators.compose([Validators.required, Validators.minLength(2)])],
          'email': [userData.email, Validators.compose([Validators.required, Validators.email])],
          'senha': [userData.senha, Validators.compose([Validators.minLength(8), Validators.required, Validators.maxLength(28)])],
          'cpf': [userData.cpf, Validators.compose([Validators.required, Validators.minLength(11)])],
          'logradouro': [userData.logradouro],
          'numero': [userData.numero],
          'complemento': [userData.complemento],
          'cep': [userData.cep],
          'bairro': [userData.bairro],
          'cidade': [userData.cidade],
          'uf': [userData.uf, Validators.minLength(2)]
        });
        this.loader = false;
      });
  }
  private getOrders() {

    let token = localStorage.getItem(this.keyToken);
    let login = localStorage.getItem(this.keyLogin);
    this.GS.getOrdersByUser(login, token)
      .subscribe(response => {
        this.orders = response['data'];
        console.log(this.orders);
      });
  }
}
