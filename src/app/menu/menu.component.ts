import { Component, OnInit, Input } from '@angular/core';
import { GeneralServices } from 'src/app/services/services';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  protected menu: Array<any> = []
  pedidos; 
  @Input() update: boolean;
  constructor(
    private GS: GeneralServices
  ) {
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
