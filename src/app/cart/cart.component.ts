import { Component, OnInit, Input } from '@angular/core';
// import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  
  constructor() {}
  @Input() public products = []
  private productExists: boolean = false;
  ngOnInit() {
  }

  public updateView(prod) {
    this.productExists = true;
    this.products = prod;
    console.log(this.products);
  }
}
