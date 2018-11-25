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
  value;

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
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'senha': [null, Validators.compose([Validators.minLength(8),Validators.required, Validators.maxLength(28)])],
      'nome' : [null, Validators.compose([Validators.required, Validators.minLength(2)])],
      'rua' : [null],
      'numero' : [null],
      'complemento' : [null],
      'cep' : [null],
      'cpf' : [null],
    });
  }


  public sendData() {

    console.log(this.subscribeForm.value);
    debugger
    let sendableObj = {
      nome: this.subscribeForm.value.nome,
      email: this.subscribeForm.value.email,
      senha: this.subscribeForm.value.senha,
      cpf: this.subscribeForm.value.cpf
    }
    this.GS.postClient(JSON.stringify(sendableObj))
    .subscribe( response => {

    }, error => {
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












