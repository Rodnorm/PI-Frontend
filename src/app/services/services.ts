import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
  })

export class GeneralServices {
    userLogin: String = '';
    endPointUrl = 'http://localhost:3000/'
    // endPointUrl = 'http://localhost:8080/';
    // endPointUrl = 'http://10.135.147.13:8080/';

    produtos = [];
    total;
     
    public logado: boolean = false;
    public testScenario:  boolean = false; 
    public token = '';
    private headers = new HttpHeaders({
        "Content-Type": "application/json"
    });

    public carrinho = [];
    constructor (
        private http: HttpClient
    ) {}

    public getProducts() {
        return this.http.get<any[]>(this.endPointUrl + 'products');//ok
    }
    
    public getMoreProducts() {
        return this.http.get<any[]>(this.endPointUrl + 'products');//ok
    }
    public getUserDetails(login, token) {
        return this.http.get<any[]>(this.endPointUrl + `customers/customer/${login}`, {headers : {"x-access-token":token}});//ok
    }
    public getOrdersByUser(login, token){
        return this.http.post<any[]>(this.endPointUrl + `orders/${login}`, token, {headers : {"x-access-token":token}});//ok
    }
    public postClient(body) {
        return this.http.post<any>(this.endPointUrl + 'customers/customer/create', body, {headers : this.headers});//ok
    }

    public postOrder(body, token) {
        return this.http.post<any>(this.endPointUrl + 'orders/order/create', body, {headers : {"x-access-token":token, "Content-Type": "application/json"}});
    }

    public postClientAuth(body) {
        return this.http.post<any[]>(this.endPointUrl + 'customers/customer/authenticate', body, {headers : this.headers})//ok
    }
    public sessionChecker(token) {
        let headers = new HttpHeaders({
            "x-access-token": `${token}`
        });
        return this.http.post<any>(this.endPointUrl + 'customers/session', token, {headers});//ok
    }
}