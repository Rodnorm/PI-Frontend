import { Component, OnInit } from '@angular/core';
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

  constructor(
    private fb : FormBuilder,
    private GS : GeneralServices
  ) { }

  ngOnInit() {
    this.createLoginForm();
  }

  private createLoginForm() {
    this.loginForm = this.fb.group({
      'login' : [null, Validators.compose([Validators.required, Validators.email, Validators.minLength(2)])],
      'senha' : [null, Validators.compose([Validators.minLength(8),Validators.required, Validators.maxLength(28)])]
    });
  }

  public validateValues() {
    
    this.loader = true;

    setTimeout( () => {
      
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

    let obj = JSON.stringify({
      login: this.loginForm.value.login,
      senha: this.loginForm.value.senha
    });

    this.GS.postClientAuth(obj)
    .subscribe(data => {
      this.loader = false;
      console.log(data);
    }, error => {
      this.loader = false;
      console.log(error);
    });
  }
}
