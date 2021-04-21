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

  posts=[];
  type=[];
  time=[];
  constructor(public Servicio: ServicioComponentesService, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.Servicio.sharedMesssageVistaAsig.subscribe(messageVistaAsig => this.mostrar = messageVistaAsig);
    this.Servicio.sharedMessageToken.subscribe(messageToken => this.token = messageToken);
    this.Servicio.sharedMessageObjAsig.subscribe( asignatura => this.subject = asignatura);
    this.Servicio.sharedMessageIDAsig.subscribe( id => {this.id = id; this.obtenerPosts(); });
    this.Servicio.sharedMessageCentralCurso.subscribe( curso => this.curso = curso);
  }


  /***** Si se lanza la app y sale en pantalla un error de GET es por esta funcion.
   * Para que se lance bien, comentar el contenido de la funcion.
   * Una vez se actualice, descomentarla y funcionara bien.
   * Aun no se sabe bien por que ocurre esto.
   */
  obtenerPosts(){
    if (this.id != null){
       const headers = new HttpHeaders({Authorization: `Bearer ${this.token}`, 'Content-Type': 'application/json'});

       this.http.get(this.Servicio.URL_API + '/posts/subject/' + this.id + '/created', {headers} ).subscribe(
         (resp: string) => {
           this.posts =[];
           this.type = [];
           this.time = [];
           if(resp.posts != null){
             for (let i =0 ; i < resp.posts.length; i++){
               //this.posts[i] =  resp.posts[i].title + '\n\n\n' + resp.posts[i].category;
               this.posts[i] = resp.posts[i].title;
               this.type[i] = resp.posts[i].category;
               this.time[i] = (resp.posts[i].created_at).split('T',1);
             }
           }
           else{
             this.posts =[];
             this.type = [];
             this.time = [];
           }
         },
         (error: string) => {console.log(error); });
    }
 }

 ordeCat(){
   const headers = new HttpHeaders({Authorization: `Bearer ${this.token}`, 'Content-Type': 'application/json'});

   this.http.get(this.Servicio.URL_API + '/posts/' + this.id + '/category/' + this.cat, {headers} ).subscribe(
     (resp: string) => {
       if(resp.posts != null){
         this.posts =[];
         this.type = [];
         this.time= [];
         for (let i =0 ; i < resp.posts.length; i++){
           this.posts[i] = resp.posts[i].title;
           this.type[i] = resp.posts[i].category;
           this.time[i] = (resp.posts[i].created_at).split('T',1);
         }
       }
       else{
         this.posts =[];
         this.type = [];
         this.time= [];
       }
     },(error: string) => {console.log(error); });
   this.clear();
 }

 buscarTitulo(){
   const headers = new HttpHeaders({Authorization: `Bearer ${this.token}`, 'Content-Type': 'application/json'});

   this.http.get(this.Servicio.URL_API + '/posts/' + this.id + '/title/' + this.tema, {headers} ).subscribe(
     (resp: string) => {
       if(resp.posts != null){
         this.posts =[];
         this.type = [];
         this.time= [];
         for (let i =0 ; i < resp.posts.length; i++){
           this.posts[i] = resp.posts[i].title;
           this.type[i] = resp.posts[i].category;
           this.time[i] = (resp.posts[i].created_at).split('T',1);
         }
       }
       else{
         this.posts =[];
         this.type = [];
         this.time= [];
       }
     },(error: string) => {console.log(error); });
   this.clear();
 }

 ordenFecha(){
   const headers = new HttpHeaders({Authorization: `Bearer ${this.token}`, 'Content-Type': 'application/json'});

   this.http.get(this.Servicio.URL_API + '/posts/subject/' + this.id + '/'+ this.fech, {headers} ).subscribe(
     (resp: string) => {
       this.posts =[];
       this.type = [];
       this.time= [];
       if(resp.posts != null){
         for (let i =0 ; i < resp.posts.length; i++){
           this.posts[i] = resp.posts[i].title;
           this.type[i] = resp.posts[i].category;
           this.time[i] = (resp.posts[i].created_at).split('T',1);
         }
       }
       else{
         this.posts =[];
         this.type = [];
         this.time = [];
       }
     },
     (error: string) => {console.log(error); });
   this.clear();
 }

 clear(){
    this.tema='';
    this.cat='';
    this.fech= '';
 }
}
