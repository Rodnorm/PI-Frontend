import { Component, OnInit, Input } from '@angular/core';
import { GeneralServices } from 'src/app/services/services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-low-inventory',
  templateUrl: './low-inventory.component.html',
  styleUrls: ['./low-inventory.component.scss']
})
export class LowInventoryComponent implements OnInit {

  @Input() produto;
  private message: string;
  private loader: boolean = false;
  private success: boolean = false;

  lowInventoryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private GS: GeneralServices
  ) { }

  ngOnInit() {

    this.createInventoryForm();
  }

  private createInventoryForm() {
    this.lowInventoryForm = this.fb.group({
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'name': [null, Validators.compose([Validators.minLength(2), Validators.required])]
    });
  }

  private sendEmail() {
    
    this.loader = true;

    let obj = JSON.stringify({
      "idProduto": this.produto,
      "nomeInteressado": this.lowInventoryForm.value.name,
      "email": this.lowInventoryForm.value.email,
    });

    this.GS.letMeKnow(obj)
    .subscribe(response => {
      this.loader = false;
      this.success = true;
      this.message = response['body']['data'];
    });
  }
}
