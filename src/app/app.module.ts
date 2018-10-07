import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { DescriptionModalContent } from './description/description.component';
import { MainComponent } from './main/main.component';  
import { CarousselComponent } from './caroussel/caroussel.component';
import { MenuComponent } from './menu/menu.component';
import { ProductsComponent } from './products/products.component';
import { DescriptionComponent } from './description/description.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CarousselComponent,
    MenuComponent,
    ProductsComponent,
    DescriptionComponent,
    DescriptionModalContent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot()
  ],
  entryComponents:[
    DescriptionComponent,
    DescriptionModalContent
  ],
  providers: [
    ProductsComponent,
    DescriptionComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
