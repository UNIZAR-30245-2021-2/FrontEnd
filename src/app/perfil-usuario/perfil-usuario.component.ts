import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ServicioComponentesService} from '../servicios/servicio-componentes.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {

  mostrar = false;
  perfil = true;
  editP = false;
  replies = false;

  token;
  idLog;

  nomUser: string;
  correo: string;
  curso: string;
  img: string;

  correo2: string;
  curso2: string;
  constructor(private http: HttpClient, public Servicio: ServicioComponentesService) { }

  ngOnInit(): void {
    this.Servicio.sharedMessageVerPerfil.subscribe(message => { this.mostrar = message; this.datosUser(); } );
    this.Servicio.sharedMessageToken.subscribe( message => this.token = message);
    this.Servicio.sharedMessageID.subscribe( message => this.idLog = message );


  }

  datosUser() {
    const headers = new HttpHeaders({Authorization: `Bearer ${this.token}`, 'Content-Type': 'application/json'});

    this.http.get(this.Servicio.URL_API + '/users/' + this.idLog, {headers} ).subscribe(
      (resp: string) => {
        // @ts-ignore
        this.nomUser = resp.user.username;
        // @ts-ignore
        this.correo = resp.user.email;
        // @ts-ignore
        this.curso = resp.user.year;
        // @ts-ignore
        this.img = resp.user.picture;
      },
      (error: string) => { console.log(error); });
  }

  guardar() {
    const headers = new HttpHeaders({Authorization: `Bearer ${this.token}`, 'Content-Type': 'application/json'});

    const up = {
    email: this.correo2,
    picture: this.img,
    year: Number(this.curso2),
    };

    this.http.put(this.Servicio.URL_API + '/users/' + this.idLog, JSON.stringify(up), {headers} ).subscribe(
      (resp: string) => { this.Servicio.nextMessageVerPerfilUser(true); this.editP = false; this.perfil = true; this.clear(); },
      (error: string) => { console.log(error); });
  }

  comprobar() {
    const  cOk = /\d+@unizar.es/.test(this.correo2);
    return (this.correo2 !== '' && cOk);

  }

  clear() {
    this.correo2 = '';
    this.curso2 = '';
  }
}
