import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { CoreModule } from './core/core.module';
import { TodoModule } from './todo/todo.module';

import { AppComponent } from './app.component';
import { AuthService } from './core/auth.service';

import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './login/login.module';
import { MdlModule } from '@angular-mdl/core';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MdlModule,
    CoreModule,
    TodoModule,
    LoginModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
