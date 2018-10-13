import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DescriptionComponent } from '../description/description.component';

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
    products= [
            {
                name: "Patinho de Borracha",
                price: "19,90",    
                id: 233,    
                description: "Pato de borracha para você",
                age: "livre",
                carac: "15cm | 100g",
                src: "../../assets/imgs/products/img1.jpeg",
                alt: "Patinho de borracha"
            },
            {
                name: "Aviãozinho de papel",
                price: "199,90",
                id: 232,
                description: "Modelo alienígena para você!",
                age: "livre",
                carac: "15cm | 100g",
                src: "../../assets/imgs/products/img2.jpeg",
                alt: "Seu pai sabe fazer aviões de papel?"
            },
            {
                name: "Cubo Mágico da Ursal",
                price: "00,00",
                id: 231,
                description: "Todos os lados sao IGUAIS!!",
                age: "livre",
                carac: "15cm | 100g",
                src: "../../assets/imgs/products/img3.jpg",
                alt: "Cubo mágido unicolor"
            },
            {
                name: "Patinho de Borracha",
                price: "19,90",
                id: 230,
                description: "Pato de borracha para você",
                age: "livre",
                carac: "15cm | 100g",
                src: "../../assets/imgs/products/img1.jpeg",
                alt: "Patinho de borracha"
            },
            {
                name: "Aviãozinho de papel",
                price: "199,90",
                id: 203,
                description: "Modelo alienígena para você!",
                age: "livre",
                carac: "15cm | 100g",
                src: "../../assets/imgs/products/img2.jpeg",
                alt: "Seu pai sabe fazer aviões de papel?"
            },
            {
                name: "Cubo Mágico da Ursal",
                price: "00,00",
                id: 73,
                description: "Todos os lados sao IGUAIS!!",
                age: "livre",
                carac: "15cm | 100g",
                src: "../../assets/imgs/products/img3.jpg",
                alt: "Cubo mágido unicolor"
            },
            {
                name: "Patinho de Borracha",
                price: "19,90",
                id: 83,
                description: "Pato de borracha para você",
                age: "livre",
                carac: "15cm | 100g",
                src: "../../assets/imgs/products/img1.jpeg",
                alt: "Patinho de borracha"
            },
            {
                name: "Aviãozinho de papel",
                price: "199,90",
                id: 93,
                description: "Modelo alienígena para você!",
                age: "livre",
                carac: "15cm | 100g",
                src: "../../assets/imgs/products/img2.jpeg",
                alt: "Seu pai sabe fazer aviões de papel?"
            },
            {
                name: "Cubo Mágico da Ursal",
                price: "00,00",
                id: 334,
                description: "Todos os lados sao IGUAIS!!",
                age: "livre",
                carac: "15cm | 100g",
                src: "../../assets/imgs/products/img3.jpg",
                alt: "Cubo mágido unicolor"
            },
            {
                name: "Patinho de Borracha",
                price: "19,90",
                id: 13,
                description: "Pato de borracha para você",
                age: "livre",
                carac: "15cm | 100g",
                src: "../../assets/imgs/products/img1.jpeg",
                alt: "Patinho de borracha"
            },
            {
                name: "Aviãozinho de papel",
                price: "199,90",
                id: 53,
                description: "Modelo alienígena para você!",
                age: "livre",
                carac: "15cm | 100g",
                src: "../../assets/imgs/products/img2.jpeg",
                alt: "Seu pai sabe fazer aviões de papel?"
            },
            {
                name: "Cubo Mágico da Ursal",
                price: "00,00",
                id: 43,
                description: "Todos os lados sao IGUAIS!!",
                age: "livre",
                carac: "15cm | 100g",
                src: "../../assets/imgs/products/img3.jpg",
                alt: "Cubo mágido unicolor"
            }
        ];

  constructor(
      private DescriptionComponent: DescriptionComponent,
      private formBuilder: FormBuilder,
      ) {}

  ngOnInit() {
    this.formulario = new FormGroup({
        quantidade: new FormControl(null)
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