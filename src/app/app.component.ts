import { Component } from '@angular/core';
import construct = Reflect.construct;
import {ServicioComponentesService} from './servicios/servicio-componentes.service';
import { Time } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FrontEnd';
  constructor( public Servicio: ServicioComponentesService){
  }


}

/* DEFINICIÓN DE MODELOS DEL SISTEMA */

/* Clase User - equivalente a User en backend */
export class User {
  id: number;
  username: string;
  email: string;
  picture: string;
  year: number;
  admin: boolean;
  password: string;
  passwordHash: string;
  created_at: Time;
  updated_at: Time;


  constructor() {
    this.admin = false; // Usuario por defecto
}

}

export class UserRequest {
  username: string;
  email: string;
  year: number;
  admin: boolean;
  password: string;
}

/* Clase Cancion - equivalente a CancionDTO en backend
export class Cancion {
  id: number;
  name: string;
  fecha_subida: Date;
  duracion: number; //Duración de la canción (en segundos)
  album: string;
  artistas: Array<string>;

  constructor() {
    this.artistas = new Array<string>();
  }
}*/
