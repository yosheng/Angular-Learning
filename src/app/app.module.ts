import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { TodoModule } from './todo/todo.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './core/auth.service';

import { routing } from './app.routes';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    TodoModule,
    routing,
  ],
  providers: [
    {provide: 'auth',  useClass: AuthService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
