import { Component, OnInit } from '@angular/core';
import { DescriptionComponent } from '../description/description.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

    products= [
            {
                name: "Patinho de Borracha",
                price: "19,90",        
                description: "Pato de borracha para você",
                age: "livre",
                carac: "15cm | 100g",
                src: "../../assets/imgs/products/img1.jpeg",
                alt: "Patinho de borracha"
            },
            {
                name: "Aviãozinho de papel",
                price: "199,90",
                description: "Modelo alienígena para você!",
                age: "livre",
                carac: "15cm | 100g",
                src: "../../assets/imgs/products/img2.jpeg",
                alt: "Seu pai sabe fazer aviões de papel?"
            },
            {
                name: "Cubo Mágico da Ursal",
                price: "00,00",
                description: "Todos os lados sao IGUAIS!!",
                age: "livre",
                carac: "15cm | 100g",
                src: "../../assets/imgs/products/img3.jpg",
                alt: "Cubo mágido unicolor"
            },
            {
                name: "Patinho de Borracha",
                price: "19,90",
                description: "Pato de borracha para você",
                age: "livre",
                carac: "15cm | 100g",
                src: "../../assets/imgs/products/img1.jpeg",
                alt: "Patinho de borracha"
            },
            {
                name: "Aviãozinho de papel",
                price: "199,90",
                description: "Modelo alienígena para você!",
                age: "livre",
                carac: "15cm | 100g",
                src: "../../assets/imgs/products/img2.jpeg",
                alt: "Seu pai sabe fazer aviões de papel?"
            },
            {
                name: "Cubo Mágico da Ursal",
                price: "00,00",
                description: "Todos os lados sao IGUAIS!!",
                age: "livre",
                carac: "15cm | 100g",
                src: "../../assets/imgs/products/img3.jpg",
                alt: "Cubo mágido unicolor"
            },
            {
                name: "Patinho de Borracha",
                price: "19,90",
                description: "Pato de borracha para você",
                age: "livre",
                carac: "15cm | 100g",
                src: "../../assets/imgs/products/img1.jpeg",
                alt: "Patinho de borracha"
            },
            {
                name: "Aviãozinho de papel",
                price: "199,90",
                description: "Modelo alienígena para você!",
                age: "livre",
                carac: "15cm | 100g",
                src: "../../assets/imgs/products/img2.jpeg",
                alt: "Seu pai sabe fazer aviões de papel?"
            },
            {
                name: "Cubo Mágico da Ursal",
                price: "00,00",
                description: "Todos os lados sao IGUAIS!!",
                age: "livre",
                carac: "15cm | 100g",
                src: "../../assets/imgs/products/img3.jpg",
                alt: "Cubo mágido unicolor"
            },
            {
                name: "Patinho de Borracha",
                price: "19,90",
                description: "Pato de borracha para você",
                age: "livre",
                carac: "15cm | 100g",
                src: "../../assets/imgs/products/img1.jpeg",
                alt: "Patinho de borracha"
            },
            {
                name: "Aviãozinho de papel",
                price: "199,90",
                description: "Modelo alienígena para você!",
                age: "livre",
                carac: "15cm | 100g",
                src: "../../assets/imgs/products/img2.jpeg",
                alt: "Seu pai sabe fazer aviões de papel?"
            },
            {
                name: "Cubo Mágico da Ursal",
                price: "00,00",
                description: "Todos os lados sao IGUAIS!!",
                age: "livre",
                carac: "15cm | 100g",
                src: "../../assets/imgs/products/img3.jpg",
                alt: "Cubo mágido unicolor"
            }
        ]

  constructor(private DescriptionComponent: DescriptionComponent) { }

  ngOnInit() {
  }
  
  private openModal(product){
    this.DescriptionComponent.open(product);
  }
}



