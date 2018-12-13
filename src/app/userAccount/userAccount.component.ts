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
  private message;
  private success: boolean = false;
  private loader: boolean = false;
  updateInfo: FormGroup;
  private keyCustomer = 'Customer';


  constructor(
    private formBuilder: FormBuilder,
    private GS: GeneralServices
  ) { }

  ngOnInit() {

    this.getUser();
    this.getOrders();
    this.checkSession();
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

      });
  }

  private logout() {
    localStorage.clear();
    this.GS.logado = false;
    this.GS.loggedIn = false;
  }

  private checkSession(token?) {

    if (!token && localStorage.getItem(this.keyToken) && localStorage.getItem(this.keyLogin)) {
      let token = localStorage.getItem(this.keyToken);
      let login = localStorage.getItem(this.keyLogin);
      this.GS.sessionChecker(token)
        .subscribe(res => {
          this.GS.getUserDetails(login, token)
            .subscribe(resp => {
              localStorage.setItem(this.keyCustomer, resp['data'].idCliente);
              this.resolveLoggin(resp, login);
            });
        });
      return;
    }
  }

  private resolveLoggin(resp, login) {
    localStorage.setItem(this.keyLogin, login);
    this.loader = false;
    this.GS.logado = true;
    this.GS.loggedIn = true;
  }

  private sendData() {
    this.loader = true;
    let obj = {
      nome: this.updateInfo.value.nome,
      email: this.updateInfo.value.email,
      senha: this.updateInfo.value.senha,
      cpf: this.updateInfo.value.cpf,
      logradouro: this.updateInfo.value.logradouro,
      numero: this.updateInfo.value.numero,
      complemento: this.updateInfo.value.complemento,
      cep: this.updateInfo.value.cep,
      bairro: this.updateInfo.value.bairro,
      cidade: this.updateInfo.value.cidade,
      uf: this.updateInfo.value.uf
    }
    let auth = {
      email: this.updateInfo.value.email,
      login: this.updateInfo.value.senha
    }
    this.GS.postClientAuth(auth)
      .subscribe(async data => {

        if (data['data']) {
          this.GS.updateClient(JSON.stringify(obj))
            .subscribe(response => {
              this.success = true;
              this.message = response['body']['data'];
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
            })
        };
      });
    this.getUser();
    setTimeout(() => {
      this.success = false;
      this.loader = false;
    }, 1000);
  }
}
