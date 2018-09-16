import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private fields =
   [{    
    fieldName: "Nome"  
    },
    {    
      fieldName: "Telefone"  
    },
    {    
      fieldName: "Celular" 
    },
  ];
  private dados;

  constructor(private http:HttpClient){}


  public getData(){
    this.http.get("https://jsonplaceholder.typicode.com/users")
    .subscribe(response => {
      this.dados = response;
      console.log(this.dados);
      
    });
  }
}
