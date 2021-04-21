import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpParams } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { CentralComponent } from './central/central.component';
import { VistaListaComponent } from './vista-lista/vista-lista.component';
import { VistaAsignaturaComponent } from './vista-asignatura/vista-asignatura.component';
import { CrearTemaComponent } from './crear-tema/crear-tema.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    LoginComponent,
    CentralComponent,
    VistaListaComponent,
    VistaAsignaturaComponent,
    CrearTemaComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
