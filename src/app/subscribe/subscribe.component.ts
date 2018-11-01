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
  private matchPassword: boolean;
  private clicked = false;
  value;

  constructor(
    private formBuilder: FormBuilder,
    private socialAuthService: AuthService,
    private GS: GeneralServices
  ) {}
    
  subscribeForm: FormGroup;


  ngOnInit() {
    if(this.GS.testScenario) {
      this.value = {
        'email': 'r.normando@hotmail.com',
        'senha': 'senhasenhasenha',
        'nome' : 'Rodrigo',
        'rua' : 'rua de teste',
        'numero' : '1002',
        'complemento' : 'casa 2',
        'cep' : '04890550',
        'cpf' : '41934663883'  
      }
    }
    this.createFormGroup()
  }

  private createFormGroup(){
    if (this.GS.testScenario){
      this.subscribeForm = this.formBuilder.group({
        'login': [this.value.email, Validators.compose([Validators.required, Validators.email])],
        'senha': [this.value.senha, Validators.compose([Validators.minLength(8),Validators.required, Validators.maxLength(28)])],
        'nome' : [this.value.senha, Validators.compose([Validators.required, Validators.minLength(2)])],
        'rua' : [this.value.rua, Validators.required],
        'numero' : [this.value.numero, Validators.required],
        'complemento' : [this.value.complemento, Validators.required],
        'cep' : [this.value.cep, Validators.required],
        'cpf' : [this.value.cpf, Validators.required],
      });
      return;
    }
    this.subscribeForm = this.formBuilder.group({
      'login': [null, Validators.compose([Validators.required, Validators.email])],
      'senha': [null, Validators.compose([Validators.minLength(8),Validators.required, Validators.maxLength(28)])],
      'nome' : [null, Validators.compose([Validators.required, Validators.minLength(2)])],
      'rua' : [null, Validators.required],
      'numero' : [null, Validators.required],
      'complemento' : [null, Validators.required],
      'cep' : [null, Validators.required],
      'cpf' : [null, Validators.required],
    });
  }


  private sendData() {
    debugger
    console.log(this.subscribeForm.value);
    this.GS.postClient(JSON.stringify(this.subscribeForm.value))
    .subscribe( response => {
      debugger
            console.log(response);
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


  private checkPassword(event) {
    this.clicked = true;  
    if (event.target.value == this.subscribeForm.value.senha) {
        this.matchPassword = true;
        return;
    }
    this.matchPassword = false;
    }

}












