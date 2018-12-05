import { GeneralServices } from './../services/services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pedidos',
  templateUrl: './userAccount.component.html',
  styleUrls: ['./userAccount.component.scss']
})
export class PedidosComponent implements OnInit {

  private keyToken = 'Token';
  private keyLogin = 'Login';

  constructor(
    private GS: GeneralServices
  ) { }

  ngOnInit() {
    let token = localStorage.getItem(this.keyToken);
    let login = localStorage.getItem(this.keyLogin);
    this.GS.getUserDetails(login, token)
    .subscribe( data => {
      console.log(data);
    });
    this.getOrders(login, token);
  }


  private getOrders(login, token){
    this.GS.getOrdersByUser(login, token)
    .subscribe(response => {
      console.log(response);
    });
  }
}
