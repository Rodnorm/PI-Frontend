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
  constructor(
    private fb: FormBuilder,
    private GS: GeneralServices
  ) { }

  ngOnInit() {
    this.GS.userLogin = '';
    this.createLoginForm();
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
      .subscribe(data => {
        
        this.loggedIn = true;
        if (data['data']) {
          this.GS.getUserDetails(this.loginForm.value.login)
          .subscribe(resp => {
            console.log(resp);
            this.loader = false;
            this.GS.logado = true;
            this.name = resp['data'][0].nome; 
          });

        }
        console.log(data)
      }, error => {
        this.loader = false;
        console.log(error);
      });
  }
}
