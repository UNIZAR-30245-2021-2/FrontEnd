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
  @Input() registro1; //Flag si se solicita proceso de registro
  public login = true;

  public aceptadoT;
  public imageSeleccion;


  // Campos registro:
  alias: string;
  correo: string;
  curso: string;
  pass: string;
  pass2: string;

  usuarioUnico: boolean;

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

  receiveMessageChild($event) {
    this.registro1 = ($event);
  }


 registrado() {
    //Después del registro, vuelve a la pantalla de login
    //this.Servicio.nextMessage2(this.login);
    this.registro1 = false;

    const nuevo: UserRequest = { // Objeto usuario en registro
      username: this.alias,
      email: this.correo,
      year: Number(this.curso),
      admin: false,
      password: this.pass2,
    };

   let headers = new HttpHeaders().set('Content-Type', 'application/json');

    this.http.post(this.Servicio.URL_API + '/users/', JSON.stringify(nuevo),{headers}).subscribe(
     (resp: string) => {} );

    this.resetCampos();
  }

  /* Función para comprobar si los datos del formulario son adecuados */
   datosok() {
     const  cOk = /\d+@unizar.es/.test(this.correo);
    return (this.usuarioUnico && this.alias !== '' && this.correo !== '' && cOk
           && this.pass !== '' && this.pass2 !== '' &&
            this.pass === this.pass2 &&  this.aceptadoT);
  }

  alternarAceptado() {
    if (this.aceptadoT) { this.aceptadoT = false;}
    else this.aceptadoT = true;
  }

  newToLogin(){
     this.Servicio.nextMessage2(this.login);
  }

  existeUsuario(){
    const params = new HttpParams()
      .set('nick', this.alias);

    this.http.get(this.Servicio.URL_API + '/user/get', {params})
      .subscribe(
        (resp: User) => {
          this.usuarioUnico = false;
        },
        (erroro: string) => {
          this.usuarioUnico = true;
        }
      );
  }

  nickCorrecto(){
    return !this.usuarioUnico && this.alias != '';
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
