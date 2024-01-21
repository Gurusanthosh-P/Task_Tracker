import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Pages/home/home.component';
import { LoginComponent } from './Pages/login/login.component';
import { LoginPageComponent } from './Components/login-page/login-page.component';
import { FormsModule } from '@angular/forms';
import { HomePageComponent } from './Components/home-page/home-page.component';

import { ProductService } from './Services/userData/product.service';
import { ConfirmationService, MessageService } from 'primeng/api';


import {DropdownModule} from 'primeng/dropdown'
import {ButtonModule} from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import {ToastModule} from 'primeng/toast'
import {TagModule} from 'primeng/tag'
import {DialogModule} from 'primeng/dialog'
import {InputTextareaModule} from 'primeng/inputtextarea'
import {RadioButtonModule} from'primeng/radiobutton'
import {ToolbarModule} from 'primeng/toolbar'
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DataViewModule } from 'primeng/dataview';
import { SignupComponent } from './Pages/signup/signup.component';
import { SignupformComponent } from './Components/signupform/signupform.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LoginPageComponent,
    HomePageComponent,
    SignupComponent,
    SignupformComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    ToastModule,
    TagModule,
    DialogModule,
    InputTextareaModule,
    RadioButtonModule,
    ToolbarModule,
    InputNumberModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    DataViewModule
  ],
  providers: [MessageService,ProductService,ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
