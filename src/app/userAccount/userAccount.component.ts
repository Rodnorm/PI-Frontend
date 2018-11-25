import { GeneralServices } from './../services/services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pedidos',
  templateUrl: './userAccount.component.html',
  styleUrls: ['./userAccount.component.scss']
})
export class PedidosComponent implements OnInit {

  constructor(
    private GS: GeneralServices
  ) { }

  ngOnInit() {
    this.GS.getUserDetails({
      email: this.GS.userLogin
    });
  }

}
