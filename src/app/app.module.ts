import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';  
import { CarousselComponent } from './caroussel/caroussel.component';
import { MenuComponent } from './menu/menu.component';
import { ProductsComponent } from './products/products.component';
import { DescriptionComponent } from './description/description.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubscribeComponent } from './subscribe/subscribe.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CarousselComponent,
    MenuComponent,
    ProductsComponent,
    DescriptionComponent,
    SubscribeComponent
    ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents:[
    DescriptionComponent
  ],
  providers: [
    ProductsComponent,
    DescriptionComponent,
    ProductsComponent
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  bootstrap: [AppComponent],
})
export class AppModule { }
