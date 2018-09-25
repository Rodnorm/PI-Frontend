import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  protected menu: Array<any> = []
  constructor() {
    this.menu = [
      { campo: 'Brinquedos' },
      { campo: 'Colecionáveis' },
      { campo: 'Carrinho' },
      { campo: 'Jogos' },
      { campo: 'Login' }
    ]
   }

  ngOnInit() {
  }

}
