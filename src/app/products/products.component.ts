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
    public carrinho = [] = this.GS.carrinho;
    item = [];
    total = 0;
    removeId;
    products = [];
    esvaziarCarrinho = false;
    logado = this.GS.logado;


  constructor(
      private DescriptionComponent: DescriptionComponent,
      private formBuilder: FormBuilder,
      private GS: GeneralServices
      ) {}

  ngOnInit() {

    this.formulario = this.formBuilder.group({
        'quantidade': [1]
    });

    this.GS.getProducts()
    .subscribe(data => {
        this.products = data;
    }, error => {
        console.log(error);
    });

    //implementar aqui o método que verifica usuário
    
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
                idProduto : id,
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
                idProduto : id,
                nome : nomeProduto,
                quantidade: this.formulario.value.quantidade,
                preco: preco,
                subtotal: subtotal
            });
            this.updateTotal();
            return;
        }
        this.carrinho.push({
            idProduto : id,
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
    protected removeItem() {
        if (this.esvaziarCarrinho) {
            this.carrinho = [];
            this.updateTotal();
            this.esvaziarCarrinhoToggle();
            return;
        }
        let index = 0;
        for (let item in this.carrinho) {
            if (this.carrinho[item].idProduto === this.removeId) {
                this.carrinho.splice(index, 1);
                this.updateTotal();
            }
            index++;
        }
    }
    private esvaziarCarrinhoToggle(checker?) {
        if (!checker) {
            this.esvaziarCarrinho = false;
        }

        if (this.esvaziarCarrinho) {
            this.esvaziarCarrinho = false;
            return
        }
        this.esvaziarCarrinho = true;
    }
}