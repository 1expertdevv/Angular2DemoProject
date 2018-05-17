import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { adminTemplateComponent } from './components/adminTemplate/adminTemplate.component';
import { memberTemplateComponent } from './components/memberTemplate/memberTemplate.component';
import { adminLoginComponent } from './components/adminLogin/adminLogin.component';
import { addItemsComponent } from './components/addItems/addItems.component';
import { showItemsComponent } from './components/showItems/showItems.component';
import { homeComponent } from './components/home/home.component';



@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        adminTemplateComponent,
        memberTemplateComponent,
        adminLoginComponent,
        addItemsComponent,
        showItemsComponent,
        homeComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'adminLogin', pathMatch: 'full' },
            { path: 'adminLogin', component: adminLoginComponent },
            { path: 'addItems', component: addItemsComponent },
            { path: 'showItems', component: showItemsComponent },
            { path: 'home', component: homeComponent },
            { path: '**', redirectTo: 'adminLogin' }
        ])
    ]
})
export class AppModuleShared {
}
