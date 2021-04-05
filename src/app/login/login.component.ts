import {Component, Output, EventEmitter, OnInit, Input} from '@angular/core';
import {HttpClient, HttpParams, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {User, UserRequest} from '../app.component';
import {ServicioComponentesService} from '../servicios/servicio-componentes.service';
import {stringify} from 'querystring';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logeado;
  registro: boolean = true;
  aviso: boolean = false;

  // campos de login
  nomUsuario: string;
  contrasena: string;
  correctoNick: string;
  correctoPass: string;

  usuario: User = new User();


  @Output() messageEvent = new EventEmitter<boolean>();

  constructor(private http: HttpClient, public Servicio: ServicioComponentesService) {
    this.nomUsuario = '';
    this.contrasena = '';
  }

  ngOnInit(): void {
    this.logeado = false;
    this.Servicio.nextMessage2(false);
    this.Servicio.nextMessage(this.usuario);
    this.Servicio.sharedMessage2.subscribe(message2 => this.logeado = message2);
  }

  sendMessageFather(){
    this.messageEvent.emit(this.registro);
  }


   comprobar(){
    //const params = new HttpParams().set('username', this.nomUsuario).set('password', btoa(this.contrasena));
    /*  const respuesta = await fetch(this.Servicio.URL_API, {body: JSON.stringify(usuario), method: 'POST',});
    const json = await respuesta.json();*/

    const usuario = {
      username: this.nomUsuario,
      password: this.contrasena,
    };

    const headers = new HttpHeaders().set('Content-Type', 'application/json');


    this.http.post(this.Servicio.URL_API + '/users/login/', JSON.stringify(usuario),{headers}).subscribe(
      (resp: JSON) => { this.logeado = true;
        this.Servicio.nextMessageCentral(true);
        this.Servicio.nextMessage2(true);
      },
      (error:string)=> {this.aviso=true;} );
  }

  resetearCampos(){
    this.nomUsuario = '';
    this.contrasena = '';
  }

}
