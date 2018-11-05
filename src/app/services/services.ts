import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
  })

export class GeneralServices {

    endPointUrl = 'http://localhost:8080/';

    produtos = [];
    total;
    // 
    public logado: boolean = true;
    public testScenario:  boolean = false;
    // 
    public carrinho = [];
    constructor(
        private http: HttpClient
    ) {}

    public getProducts() {
        return this.http.get<any[]>(this.endPointUrl + 'produto/list-produto');
    }

    public postClient(body) {
        const headers = new HttpHeaders({
            "Content-Type": "application/json"
        });
        return this.http.post<any>(this.endPointUrl+'cliente/save', body, {headers : headers});
    }

    public postOrder(body) {
        const headers = new HttpHeaders({
            "Content-Type": "application/json"
        });
        return this.http.post<any>(this.endPointUrl+'pedido/save', body, {headers : headers});
    }

    public getPedidos() {
        return this.http.get(this.endPointUrl+'pedido/list-pedido');
    }
}