import { MainComponent } from './main/main.component';
import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";


import { PedidosComponent } from './userAccount/userAccount.component';
import { InstitucionalComponent } from 'src/app/institucional/institucional.component';


export const routing: Routes = [
    {
        path: '', component: MainComponent
    },
    {
        path: 'minhaconta', component: PedidosComponent
    },
    {
        path: 'quemsomos', component: InstitucionalComponent
    }
];
