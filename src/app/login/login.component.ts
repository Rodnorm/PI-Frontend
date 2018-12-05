import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GeneralServices } from '../services/services';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {



  loginForm: FormGroup;
  public loader: boolean = false;
  public loggedIn: boolean = false;
  private name: String;
  private keyToken = 'Token';
  private keyLogin = 'Login';
  constructor(
    private fb: FormBuilder,
    private GS: GeneralServices
  ) { }

  ngOnInit() {
    this.GS.userLogin = '';
    this.createLoginForm();
    this.checkSession();
  }

  private createLoginForm() {
    this.loginForm = this.fb.group({
      'login': [null, Validators.compose([Validators.required, Validators.email, Validators.minLength(2)])],
      'senha': [null, Validators.compose([Validators.minLength(8), Validators.required, Validators.maxLength(28)])]
    });
  }

  public validateValues() {

    this.loader = true;

    setTimeout(() => {

      if (
        this.loginForm.invalid ||
        this.loginForm.value.login.includes(' ') ||
        this.loginForm.value.senha.includes(' ')
      ) {
        this.loader = false;
        return false;
      }
      this.sendUser();

    }, 2000);

  }

  private sendUser() {

    this.GS.userLogin = this.loginForm.value.login;
    let obj = JSON.stringify({
      login: this.loginForm.value.login,
      senha: this.loginForm.value.senha
    });

    this.GS.postClientAuth(obj)
      .subscribe(async data => {

        if (data['data']) {
          this.setLocalStore(data);

          this.GS.getUserDetails(this.loginForm.value.login, data['data'].token)
            .subscribe(resp => {
              this.GS.token = data['data'].token;
              this.resolveLoggin(resp, this.loginForm.value.login);

              setInterval(() => {
                this.checkSession(data['data'].token);
              }, 240000) //a cada 4 minutos verifica se a sessão ainda é válida

            });

        }
      }, error => {
        this.loader = false;
        console.log(error);
      });
  }

  private resolveLoggin(resp, login) {
    localStorage.setItem(this.keyLogin, login);
    this.loader = false;
    this.GS.logado = true;
    this.name = resp['data'].nome;
    this.loggedIn = true;
  }

  private checkSession(token?) {

    if (!token && localStorage.getItem(this.keyToken) && localStorage.getItem(this.keyLogin)) {
      let token = localStorage.getItem(this.keyToken);
      let login = localStorage.getItem(this.keyLogin);
      this.GS.sessionChecker(token)
        .subscribe(res => {
          this.GS.getUserDetails(login, token)
            .subscribe(resp => {
              this.resolveLoggin(resp, login);
            });
        });
      return;
    }
  }

  private setLocalStore(data) {
    localStorage.setItem(this.keyToken, data['data'].token);
  }


  private logout() {
    this.GS.logado = false;
  }
}
