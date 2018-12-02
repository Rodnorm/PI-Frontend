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
    this.GS.getUserDetails(this.GS.userLogin, this.GS.token)
    .subscribe( data => {
      console.log(data);
    });
    this.getOrders();
  }


  private getOrders(){
    this.GS.getOrdersByUser(this.GS.userLogin, this.GS.token)
    .subscribe(response => {
      console.log(response);
    });
  }
}
