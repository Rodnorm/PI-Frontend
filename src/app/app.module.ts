import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from "angular-6-social-login";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
   
import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';  
import { CarousselComponent } from './caroussel/caroussel.component';
import { MenuComponent } from './menu/menu.component';
import { ProductsComponent } from './products/products.component';
import { DescriptionComponent } from './description/description.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { GeneralServices } from 'src/app/services/services';
import { CheckoutComponent } from './checkout/checkout.component';
import { LoginComponent } from './login/login.component';
import { CustomLoaderComponent } from './custom-loader/custom-loader.component';
import { PedidosComponent } from './userAccount/userAccount.component';
import { RouterModule } from '@angular/router';
import { SubscribeFormComponent } from './subscribe-form/subscribe-form.component';
import { LowInventoryComponent } from './low-inventory/low-inventory.component';


export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("1364820396988229")
        },
        // {
        //   id: GoogleLoginProvider.PROVIDER_ID,
        //   provider: new GoogleLoginProvider("Your-Google-Client-Id")
        // }
      ]
  );
  return config;
}

@NgModule({ 
  declarations: [ 
    AppComponent,
    MainComponent,
    CarousselComponent,
    MenuComponent,
    ProductsComponent,
    DescriptionComponent,
    SubscribeComponent,
    CheckoutComponent,
    LoginComponent,
    CustomLoaderComponent,
    PedidosComponent,
    SubscribeFormComponent,
    LowInventoryComponent, 
    ],
  imports: [
    SocialLoginModule,
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routing)
  ],
  entryComponents:[
    DescriptionComponent
  ],
  providers: [
    ProductsComponent,
    DescriptionComponent,
    ProductsComponent,
    GeneralServices,
    ProductsComponent,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  bootstrap: [AppComponent],
}) 
export class AppModule { }
