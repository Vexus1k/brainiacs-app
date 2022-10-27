import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/layout/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {ListModule} from "./modules/list-module/list.module";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FontAwesomeModule,
        ListModule,
        HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
