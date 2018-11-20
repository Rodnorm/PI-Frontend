import { MainComponent } from './main/main.component';
import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";


import { PedidosComponent } from './userAccount/userAccount.component';


export const routing: Routes = [
    {
        path: '', component: MainComponent
    },
    {
        path: 'minhaconta', component: PedidosComponent
    }
];

// export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
