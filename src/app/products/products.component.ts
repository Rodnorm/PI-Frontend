import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DescriptionComponent } from '../description/description.component';
import { GeneralServices } from 'src/app/services/services';

@Component({ 
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {
    formulario : FormGroup;
    quantityError: boolean = false;
    success: boolean = false;
    public carrinho = [];
    item = [];
    total = 0;
    removeId;
    products = [];


  constructor(
      private DescriptionComponent: DescriptionComponent,
      private formBuilder: FormBuilder,
      private GS: GeneralServices
      ) {}

  ngOnInit() {
    this.formulario = new FormGroup({
        quantidade: new FormControl(null)
    });

    this.GS.getProducts()
    .subscribe(data => {
        debugger    
        this.products = data;
    });
  }
  
    private changeProduct(product){
        this.item = product;
    }
    
    private checkValue(nomeProduto, id, preco) {
        if (this.formulario.value.quantidade === 0 ||
            this.formulario.value.quantidade === null ) {
            this.quantityError = true;
            return;
        }
        if (this.formulario.value.quantidade != 0) {
            this.success = true;
            
            this.addItemToCart(nomeProduto, id, preco);

            setTimeout (() => {
                this.success = false;
                this.formulario.reset();
            }, 2000);
        }
    }
    
    private addItemToCart(nomeProduto, id, preco): void {
        
        let subtotal = parseInt(preco, 10) * this.formulario.value.quantidade
        for (let i in this.carrinho) {
            if (this.carrinho[i].id === id) {
                this.carrinho[i] = {
                id : id,
                nome : nomeProduto,
                quantidade: this.formulario.value.quantidade,
                preco: preco,
                subtotal: subtotal
                }
                this.updateTotal();
                return;
            }
        }
     
        if (this.carrinho.length === 0) {
            
            this.carrinho.push({
                id : id,
                nome : nomeProduto,
                quantidade: this.formulario.value.quantidade,
                preco: preco,
                subtotal: subtotal
            });
            this.updateTotal();
            return;
        }
        this.carrinho.push({
            id : id,
            nome : nomeProduto,
            quantidade: this.formulario.value.quantidade,
            preco: preco,
            subtotal: subtotal
        });
        this.updateTotal();
    } 

    protected updateTotal(){
        if (this.carrinho.length === 0) {
            this.total = 0;
        }
        for (let item in this.carrinho) {
            this.total = this.total + this.carrinho[item].subtotal;
        }
    }

    protected removeThis(id){
        this.removeId = id;
    }
    protected removeItem(){
        let index = 0;
        for (let item in this.carrinho) {
            if (this.carrinho[item].id === this.removeId) {
                this.carrinho.splice(index, 1);
                this.updateTotal();
            }
            index++;
        }
    }
}