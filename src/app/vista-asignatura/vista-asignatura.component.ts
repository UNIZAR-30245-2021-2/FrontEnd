import { Component, OnInit } from '@angular/core';
import {User} from '../app.component';
import {ServicioComponentesService} from '../servicios/servicio-componentes.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-vista-asignatura',
  templateUrl: './vista-asignatura.component.html',
  styleUrls: ['./vista-asignatura.component.css']
})
export class VistaAsignaturaComponent implements OnInit {
  mostrar: boolean;

  curso: string;

  tema: string;
  cat: string;
  fech: string;
  res: string;

  subject: string;
  id: number = null;
  token;

  posts = [];
  type = [];
  time = [];
  ides = [];
  constructor(public Servicio: ServicioComponentesService, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.Servicio.sharedMesssageVistaAsig.subscribe(messageVistaAsig => this.mostrar = messageVistaAsig);
    this.Servicio.sharedMessageToken.subscribe(messageToken => this.token = messageToken);
    this.Servicio.sharedMessageObjAsig.subscribe( asignatura => this.subject = asignatura);
    this.Servicio.sharedMessageIDAsig.subscribe( id => {this.id = id; this.obtenerPosts(); });
    this.Servicio.sharedMessageCentralCurso.subscribe( curso => this.curso = curso);
  }


 /* Obtiene los datos de los post realizados en la asignatura seleccionada. */
  obtenerPosts() {
    if (this.id != null) {
       const headers = new HttpHeaders({Authorization: `Bearer ${this.token}`, 'Content-Type': 'application/json'});

       this.http.get(this.Servicio.URL_API + '/posts/subject/' + this.id + '/created', {headers} ).subscribe(
         (resp: string) => {
           this.posts = [];
           this.type = [];
           this.time = [];
           this.ides = [];
           // @ts-ignore
           if (resp.posts != null) {
             // @ts-ignore
             for (let i = 0 ; i < resp.posts.length; i++) {
               // @ts-ignore
               this.posts[i] = resp.posts[i].title;
               // @ts-ignore
               this.type[i] = resp.posts[i].category;
               // @ts-ignore
               this.time[i] = (resp.posts[i].created_at).split('T', 1);
               // @ts-ignore
               this.ides[i] = resp.posts[i].id;
             }
           } else {
             this.posts = [];
             this.type = [];
             this.time = [];
             this.ides = [];
           }
         },
         (error: string) => {console.log(error); });
    }
 }

 /* Ordena los post por categoria seleccionada. */
 ordeCat() {
   const headers = new HttpHeaders({Authorization: `Bearer ${this.token}`, 'Content-Type': 'application/json'});

   this.http.get(this.Servicio.URL_API + '/posts/' + this.id + '/category/' + this.cat, {headers} ).subscribe(
     (resp: string) => {
       // @ts-ignore
       if (resp.posts != null) {
         this.posts = [];
         this.type = [];
         this.time = [];
         this.ides = [];
         // @ts-ignore
         for (let i = 0 ; i < resp.posts.length; i++) {
           // @ts-ignore
           this.posts[i] = resp.posts[i].title;
           // @ts-ignore
           this.type[i] = resp.posts[i].category;
           // @ts-ignore
           this.time[i] = (resp.posts[i].created_at).split('T', 1);
           // @ts-ignore
           this.ides[i] = resp.posts[i].id;
         }
       } else {
         this.posts = [];
         this.type = [];
         this.time = [];
         this.ides = [];
       }
     }, (error: string) => {console.log(error); });
 }

 /* Busca por titulo en los post exsistentes en la asignatura */
 buscarTitulo() {
   const headers = new HttpHeaders({Authorization: `Bearer ${this.token}`, 'Content-Type': 'application/json'});

   this.http.get(this.Servicio.URL_API + '/posts/' + this.id + '/title/' + this.tema, {headers} ).subscribe(
     (resp: string) => {
       // @ts-ignore
       if (resp.posts != null) {
         this.posts = [];
         this.type = [];
         this.time = [];
         this.ides = [];
         // @ts-ignore
         for (let i = 0 ; i < resp.posts.length; i++) {
           // @ts-ignore
           this.posts[i] = resp.posts[i].title;
           // @ts-ignore
           this.type[i] = resp.posts[i].category;
           // @ts-ignore
           this.time[i] = (resp.posts[i].created_at).split('T', 1);
           // @ts-ignore
           this.ides[i] = resp.posts[i].id;
         }
       } else {
         this.posts = [];
         this.type = [];
         this.time = [];
         this.ides = [];
       }
     }, (error: string) => {console.log(error); });
 }

 /* Ordena por fecha de actualizados o creados los posts de la asignatura. */
 ordenFecha() {
   const headers = new HttpHeaders({Authorization: `Bearer ${this.token}`, 'Content-Type': 'application/json'});

   this.http.get(this.Servicio.URL_API + '/posts/subject/' + this.id + '/' + this.fech, {headers} ).subscribe(
     (resp: string) => {
       this.posts = [];
       this.type = [];
       this.time = [];
       this.ides = [];
       // @ts-ignore
       if (resp.posts != null) {
         // @ts-ignore
         for (let i = 0 ; i < resp.posts.length; i++) {
           // @ts-ignore
           this.posts[i] = resp.posts[i].title;
           // @ts-ignore
           this.type[i] = resp.posts[i].category;
           // @ts-ignore
           this.time[i] = (resp.posts[i].created_at).split('T', 1);
           // @ts-ignore
           this.ides[i] = resp.posts[i].id;
         }
       } else {
         this.posts = [];
         this.type = [];
         this.time = [];
         this.ides = [];
       }
     },
     (error: string) => {console.log(error); });
 }

 clear() {
    this.tema = ' ';
    this.cat = ' ';
    this.fech = ' ';
 }
}
