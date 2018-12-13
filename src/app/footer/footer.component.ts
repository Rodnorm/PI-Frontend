import { Component, OnInit } from '@angular/core';
import { GeneralServices } from 'src/app/services/services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  contactForm: FormGroup;
  public loader: boolean = false;
  public success: boolean = false;
  private message = '';

  constructor(
    private fb: FormBuilder,
    private GS: GeneralServices) { }

  ngOnInit() {
    this.getContactForm();
  }
  private getContactForm() {
    this.contactForm = this.fb.group({
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'message': [null, Validators.compose([Validators.required, Validators.minLength(20)])],
      'name': [null, Validators.compose([Validators.minLength(2), Validators.required])]
    });
  }


  private sendEmail() {
    this.loader = true;
    this.GS.sendContact(JSON.stringify({
      "email": this.contactForm.value.email,
      "nome": this.contactForm.value.name,
      "mensagem": this.contactForm.value.message,
    }))
    .subscribe(response => {
      this.success = true;
      this.loader = false;
      this.message = response['body']['data'];
      this.loader = false;
    });
  }
}
