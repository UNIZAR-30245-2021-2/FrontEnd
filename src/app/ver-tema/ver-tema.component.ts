import { Component, OnInit } from '@angular/core';
import {ServicioComponentesService} from '../servicios/servicio-componentes.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {computeStartOfLinePositions} from '@angular/compiler-cli/src/ngtsc/sourcemaps/src/source_file';

@Component({
  selector: 'app-ver-tema',
  templateUrl: './ver-tema.component.html',
  styleUrls: ['./ver-tema.component.css']
})
export class VerTemaComponent implements OnInit {
  mostrar: boolean;

  curso: string;

  subject: string;
  id: number = null;
  token;

  idTema: number;

  titulo: string;
  cat: string;
  body: string;
  fecha: string;
  idCreador: number;

  idAsig: number;
  idLog: number;
  ad: boolean;

  res = false;

  replies = [];
  ideUser = [];
  time = [];
  nomUser = [];
  ides = [];

  comment: string;

  nomLog: string;

  constructor(public Servicio: ServicioComponentesService, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.Servicio.sharedMessageVerTema.subscribe(message => this.mostrar = message);
    this.Servicio.sharedMessageIdTema.subscribe( message => { this.idTema = message; this.datos(); this.respuestas(); });
    this.Servicio.sharedMessageToken.subscribe(messageToken => this.token = messageToken);
    this.Servicio.sharedMessageID.subscribe( message => this.idLog = message);
    this.Servicio.sharedMessageAdmin.subscribe( message => this.ad = message);
    this.Servicio.sharedMessageObjAsig.subscribe( asignatura => this.subject = asignatura);
    this.Servicio.sharedMessageCentralCurso.subscribe( curso => this.curso = curso);
    this.Servicio.sharedMessageIDAsig.subscribe( message => this.idAsig = message);
    this.Servicio.sharedMessageNom.subscribe(message => this.nomLog = message);

  }


  /* Obtiene los datos del tema a visualizar */
  datos() {
      const headers = new HttpHeaders({Authorization: `Bearer ${this.token}`, 'Content-Type': 'application/json'});

      this.http.get(this.Servicio.URL_API + '/posts/' + this.idTema, {headers} ).subscribe(
        (resp: string) => {
          // @ts-ignore
          this.titulo = resp.post.title;
          // @ts-ignore
          this.cat = resp.post.category;
          // @ts-ignore
          this.body = resp.post.body;
          // @ts-ignore
          this.fecha = (resp.post.created_at).split('T', 1);
          // @ts-ignore
          this.idCreador = resp.post.user_id;
        },
        (error: string) => {console.log(error); });
  }

  /* Marca como resuelto un tema añadiendo la cadena en el titulo del tema. */
  resolv() {
    this.titulo = this.titulo.concat(' RESUELTO');
    this.res = true;
    const headers = new HttpHeaders({Authorization: `Bearer ${this.token}`, 'Content-Type': 'application/json'});

    const post = {
      title: this.titulo,
      category: this.cat,
      body: this.body,
    };
    this.http.put(this.Servicio.URL_API + '/posts/' + this.idTema, JSON.stringify(post), {headers} ).subscribe(
      (resp: string) => { this.Servicio.nextMessageIdTema(this.idTema); },
    (error: string) => { console.log(error); });
  }

  /* Elimina el tema que se esta visualizando */
  eliminar() {
    const headers = new HttpHeaders({Authorization: `Bearer ${this.token}`, 'Content-Type': 'application/json'});
    this.http.delete(this.Servicio.URL_API + '/posts/' + this.idTema, {headers} ).subscribe(
      (resp: string) => { this.Servicio.nextMessageVerTema(false); this.Servicio.nextMessageVistaAsig(true);
                          this.Servicio.nextMessageIDAsig(this.idAsig); },
      (error: string) => { console.log(error); });
  }

  /* Obtiene los datos de las respuestas realizadas en el tema */
  respuestas() {
    const headers = new HttpHeaders({Authorization: `Bearer ${this.token}`, 'Content-Type': 'application/json'});
    this.http.get(this.Servicio.URL_API + '/replies/post/' + this.idTema, {headers} ).subscribe(
      (resp: string) => {
        this.replies = [];
        this.ideUser = [];
        this.time = [];
        this.nomUser = [];
        this.ides = [];
        // @ts-ignore
        if (resp.replies != null) {
          // @ts-ignore
          for (let i = 0 ; i < resp.replies.length; i++) {
            // @ts-ignore
            this.replies[i] = resp.replies[i].body;
            // @ts-ignore
            this.ideUser[i] = resp.replies[i].user_id;
            this.http.get(this.Servicio.URL_API + '/users/' + this.ideUser[i], {headers} ).subscribe(
              (resp1: string) => { // @ts-ignore
                this.nomUser[i] = resp1.user.username; }, (error: string) => { console.log(error); } );
            // @ts-ignore
            this.time[i] = (resp.replies[i].created_at).split('T', 1);
            // @ts-ignore
            this.ides[i] = resp.replies[i].id;
          }
        } else {
          this.replies = [];
          this.ideUser = [];
          this.time = [];
          this.nomUser = [];
          this.ides = [];
        }
      },
      (error: string) => { console.log(error); });

  }

  /* Publica el nuevo comentario en el tema visualizado. */
  comentar() {
    const reply = {
    user_id : this.idLog,
    post_id : this.idTema,
    body : this.comment,
    };

    const headers = new HttpHeaders({Authorization: `Bearer ${this.token}`, 'Content-Type': 'application/json'});
    this.http.post(this.Servicio.URL_API + '/replies/', JSON.stringify(reply),  {headers} ).subscribe(
      (resp: string) => { this.Servicio.nextMessageIdTema(this.idTema); },
      (error: string) => { console.log(error); } );

    this.comment = '';

  }

  /* Elimina la respuesta seleccionada. */
  eliminarReply(id) {
    const headers = new HttpHeaders({Authorization: `Bearer ${this.token}`, 'Content-Type': 'application/json'});
    this.http.delete(this.Servicio.URL_API + '/replies/' + id,  {headers} ).subscribe(
      (resp: string) => { this.Servicio.nextMessageIdTema(this.idTema); },
      (error: string) => { console.log(error); } );
  }

}
