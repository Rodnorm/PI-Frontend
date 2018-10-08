import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppComponent } from './app.component';
// import { DescriptionModalContent } from './description/description.component';
import { MainComponent } from './main/main.component';  
import { CarousselComponent } from './caroussel/caroussel.component';
import { MenuComponent } from './menu/menu.component';
import { ProductsComponent } from './products/products.component';
import { DescriptionComponent } from './description/description.component';
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CarousselComponent,
    MenuComponent,
    ProductsComponent,
    DescriptionComponent,
    // DescriptionModalContent,
    CartComponent
    ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot(),
    MDBBootstrapModule.forRoot()
  ],
  entryComponents:[
    DescriptionComponent,
    // DescriptionModalContent
  ],
  providers: [
    ProductsComponent,
    DescriptionComponent
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  bootstrap: [AppComponent],
})
export class AppModule { }
