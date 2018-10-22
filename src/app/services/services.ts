import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
  })

export class GeneralServices {

    endPointUrl = 'http://localhost:8080/';
    produtos = [];
    
    constructor(
        private http: HttpClient
    ) {}

    public getProducts() {
        return this.http.get<any[]>(this.endPointUrl + 'produto/list-produto');
    }
}