import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angular-6-social-login';
import { GeneralServices } from '../services/services';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit {
 
  private ps1;
  private ps2;
  public matchPassword: boolean;
  private clicked = false;
  private loading: boolean = false;
  private success: boolean = false;
  private error: boolean = false;
  private returnMessage: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private socialAuthService: AuthService,
    private GS: GeneralServices
  ) {}
    
  subscribeForm: FormGroup;


  ngOnInit() {
    this.createFormGroup()
  }

  private createFormGroup(){
    this.subscribeForm = this.formBuilder.group({
      'nome' : [null, Validators.compose([Validators.required, Validators.minLength(2)])],
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'senha': [null, Validators.compose([Validators.minLength(8),Validators.required, Validators.maxLength(28)])],
      'cpf' : [null, Validators.compose([Validators.required, Validators.minLength(11)])],
      'logradouro' : [null],
      'numero' : [null],
      'complemento' : [null],
      'cep' : [null],
      'bairro' : [null],
      'cidade' : [null],
      'uf' : [null,Validators.minLength(2) ]
    });
  }


  public sendData() {
    this.loading = true;
    let sendableObj = {
      nome: this.subscribeForm.value.nome,
      email: this.subscribeForm.value.email,
      senha: this.subscribeForm.value.senha,
      cpf: this.subscribeForm.value.cpf,
      logradouro: this.subscribeForm.value.logradouro,
      numero: this.subscribeForm.value.numero,
      complemento: this.subscribeForm.value.complemento,
      cep: this.subscribeForm.value.cep,
      bairro: this.subscribeForm.value.bairro,
      cidade: this.subscribeForm.value.cidade,
      uf: this.subscribeForm.value.uf
    }
    console.log(JSON.stringify(sendableObj));
    this.GS.postClient(JSON.stringify(sendableObj))
    .subscribe( response => {
      this.loading = false;
      this.returnMessage = true;
      this.success = true;
      this.error = false;

    }, error => {
      this.loading = false;
      this.success = false;
      this.error = true;
      console.log(error);
    });
  }

  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    
    if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }
    else if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform+" sign in data : " , userData);
        // Now sign-in with userData
        // ...
            
      }
    );
  }


  public checkPassword(event) {
    this.clicked = true;  
    if (event.target.value == this.subscribeForm.value.senha) {
        this.matchPassword = true;
        return;
    }
    this.matchPassword = false;
    }

}












