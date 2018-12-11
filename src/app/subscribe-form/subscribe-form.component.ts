import { Component, OnInit, Input } from '@angular/core';
import { GeneralServices } from 'src/app/services/services';

@Component({
  selector: 'app-subscribe-form',
  templateUrl: './subscribe-form.component.html',
  styleUrls: ['./subscribe-form.component.scss']
})
export class SubscribeFormComponent implements OnInit {

  private loading: boolean = false;
  private success: boolean = false;
  private error: boolean = false;
  @Input() formGroup;
  @Input() facebook;
  @Input() facebookToken;
  private clicked = false;
  public matchPassword: boolean;
  constructor(
    private GS: GeneralServices
  ) { }

  ngOnInit() {
  }

  public checkPassword(event) {
    this.clicked = true;
    if (event.target.value == this.formGroup.value.senha) {
      this.matchPassword = true;
      return;
    }
    this.matchPassword = false;
  }

  public sendData() {
    this.loading = true;
    let sendableObj = {
      nome: this.formGroup.value.nome,
      email: this.formGroup.value.email,
      senha: this.formGroup.value.senha,
      cpf: this.formGroup.value.cpf,
      logradouro: this.formGroup.value.logradouro,
      numero: this.formGroup.value.numero,
      complemento: this.formGroup.value.complemento,
      cep: this.formGroup.value.cep,
      bairro: this.formGroup.value.bairro,
      cidade: this.formGroup.value.cidade,
      uf: this.formGroup.value.uf,
      token: this.facebookToken
    }

    this.GS.postClient(JSON.stringify(sendableObj))
      .subscribe(response => {
        this.loading = false;
        this.success = true;
        this.error = false;
      }, error => {
        this.loading = false;
        this.success = false;
        this.error = true;
        console.log(error);
      });
  }




}
