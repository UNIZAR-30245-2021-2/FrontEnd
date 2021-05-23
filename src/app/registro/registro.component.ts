import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {HttpClient, HttpParams, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {User, UserRequest} from '../app.component';
import {ServicioComponentesService} from '../servicios/servicio-componentes.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  @Input() registro1; // Flag si se solicita proceso de registro
  public login = true;
  public existe = false;

  public aceptadoT;



  // Campos registro:
  alias: string;
  correo: string;
  curso: string;
  pass: string;
  pass2: string;


  constructor(private http: HttpClient, public  Servicio: ServicioComponentesService) {
    this.alias = '';
    this.correo = '';
    this.curso = '';
    this.pass = '';
    this.pass2 = '';
  }

  ngOnInit(): void {
    this.Servicio.sharedMessage2.subscribe(message2 => this.login = message2);

  }

  /* Recibe del componente login el booleano para su activación.
  * Si 'registro1' es true, la pantalla de registro se hace visible.
  */
  receiveMessageChild($event) {
    this.registro1 = ($event);
  }


  /* Registra el nuevo usuario con los datos introducidos en el sistema.
   * Si el registro se ha realizado con exito, se vuelve a la pantalla de login.
   * En caso de algun error, se permanece en la pantalla de registro.
   */
 registrado() {
    this.registro1 = false;

    const nuevo: UserRequest = { // Objeto usuario en registro
      username: this.alias,
      email: this.correo,
      year: Number(this.curso),
      admin: false,
      password: this.pass2,
    };

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    this.http.post(this.Servicio.URL_API + '/users/', JSON.stringify(nuevo), {headers}).subscribe(
     (resp: JSON) => {this.registro1 = false; this.Servicio.nextMessage2(false); },
      (error: string) => {this.existe = true; this.registro1 = true; this.Servicio.nextMessageCentral(false); } );

    this.resetCampos();
  }

  /* Función para comprobar si los datos del formulario son correctos.
  * Comprueba que el correo sea de la universidad.
  * Que los campos no esten vacios y que las contraseñas coincidan. Además de que acepte las condiciones de uso.
  */
   datosok() {
     const  cOk = /\d+@unizar.es/.test(this.correo);
     return (this.alias !== '' && (this.alias.length >= 4) && (this.alias.length <= 64) && this.correo !== '' && cOk
           && this.pass !== '' && (this.pass.length >= 8) && (this.pass.length <= 32) && this.pass2 !== '' &&
            this.pass === this.pass2 &&  this.aceptadoT);
  }

  /* Para checkbox de aceptar condiciones. */
  alternarAceptado() {
    if (this.aceptadoT) { this.aceptadoT = false; } else { this.aceptadoT = true; }
  }

  /* Activa la pantalla de login para volver a ella en caso de cancelación del proceso de registro. */
  newToLogin() {
     this.Servicio.nextMessage2(this.login);
  }



  resetCampos() {
    this.alias = '';
    this.correo = '';
    this.curso = '';
    this.pass = '';
    this.pass2 = '';
    this.aceptadoT = false;
  }
}
