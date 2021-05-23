import {Component, Output, EventEmitter, OnInit, Input} from '@angular/core';
import {HttpClient, HttpParams, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {ServicioComponentesService} from '../servicios/servicio-componentes.service';
import {stringify} from 'querystring';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logeado;
  registro = true;
  aviso = false;

  // campos de login
  nomUsuario: string;
  contrasena: string;


  @Output() messageEvent = new EventEmitter<boolean>();

  constructor(private http: HttpClient, public Servicio: ServicioComponentesService) {
    this.nomUsuario = '';
    this.contrasena = '';
  }

  ngOnInit(): void {
    this.logeado = false;
    this.Servicio.nextMessage2(false);
    this.Servicio.sharedMessage2.subscribe(message2 => this.logeado = message2);
  }

  /* Evento para pasar a la pantalla de Registro */
  sendMessageFather() {
    this.messageEvent.emit(this.registro);
  }

  /* Si los datos introducidos son válidos, es decir existenen el sistema, logea al usuario en la página.
   * En caso de que los datos introducidos no sean correctos o no existan en la base de datos del sistema,
   * activa un mensaje de error en pantalla.
   */
   comprobar() {

    const usuario = {
      username: this.nomUsuario,
      password: this.contrasena,
    };

    const headers = new HttpHeaders().set('Content-Type', 'application/json');


    this.http.post(this.Servicio.URL_API + '/users/login/', JSON.stringify(usuario), {headers}).subscribe(
      (resp: string) => { this.logeado = true;
                          this.Servicio.nextMessageCentral(true);
                          this.Servicio.nextMessage2(true); this.json(resp); this.Servicio.nextMessageNomUser(this.nomUsuario);
      },
      (error: string) => {this.aviso = true; } );
  }

  /* Limpia los campos de texto. */
  resetearCampos() {
    this.nomUsuario = '';
    this.contrasena = '';
  }

  /* Función auxiliar para comprobar()
  * Envia el id y nombre de usuario, y el token para su uso en otros componentes.
  */
  json(resp) {
    this.Servicio.nextMessageID(resp.user.id);
    this.Servicio.nextMessageTok(resp.token);
    this.Servicio.nextMessageAdminMode(resp.user.admin);
  }
}
