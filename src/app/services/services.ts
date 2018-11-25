import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
  })

export class GeneralServices {
    userLogin: String = '';
    endPointUrl = 'http://localhost:8080/';
    // endPointUrl = 'http://10.135.147.13:8080/';

    produtos = [];
    total;
    // 
    public logado: boolean = false;
    public testScenario:  boolean = false;
    // 
    private headers = new HttpHeaders({
        "Content-Type": "application/json"
    });

    public carrinho = [];
    constructor (
        private http: HttpClient
    ) {}

    public getProducts() {
        return this.http.get<any[]>(this.endPointUrl + 'produto/list-produto');
    }
    
    public getPedidos() {
        return this.http.get(this.endPointUrl + 'pedido/list-pedido');
    }
    
    public getMoreProducts() {
        return this.http.get<any[]>(this.endPointUrl + 'produto/list-produto');
    }
    public getUserDetails(email) {
        return this.http.get<any[]>(this.endPointUrl + `cliente/cliente/${email}`);
    }
    public getOrdersByUser(email){
        return this.http.get<any[]>(this.endPointUrl + `pedido/history/${email}`);
    }
    public postClient(body) {
        return this.http.post<any>(this.endPointUrl + 'cliente/save', body, {headers : this.headers});
    }

    public postOrder(body) {
        return this.http.post<any>(this.endPointUrl + 'pedido/save', body, {headers : this.headers});
    }

    public postClientAuth(body) {
        return this.http.post<any[]>(this.endPointUrl + 'cliente/auth', body, {headers : this.headers})
    }
}