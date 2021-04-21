import { Component, OnInit } from '@angular/core';
import {ServicioComponentesService} from '../servicios/servicio-componentes.service';
import {User} from '../app.component';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {stringify} from 'querystring';
import {equal} from 'assert';

@Component({
  selector: 'app-vista-lista',
  templateUrl: './vista-lista.component.html',
  styleUrls: ['./vista-lista.component.css']
})
export class VistaListaComponent implements OnInit {

  aparecer: boolean;

  curso: string;
  sel: string;

  token;

  result = [];
  ides = [];
  private i: number;

  constructor(public Servicio: ServicioComponentesService, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.Servicio.sharedMessageVistaLista.subscribe(messageVistaLista => this.aparecer = messageVistaLista);
    this.Servicio.sharedMessageToken.subscribe(messageToken => this.token = messageToken);
    this.Servicio.sharedMessageCentralCurso.subscribe( curso =>{ this.curso = curso; this.transformar(this.curso);} );



  }

  transformar(cur) {
    const headers = new HttpHeaders({Authorization: `Bearer ${this.token}`, 'Content-Type': 'application/json'});
    if ( cur == 'Primer') {
      this.http.get(this.Servicio.URL_API + '/subjects/subject/' + 1, {headers} ).subscribe(
        (resp: string) => { this.result[0]= resp.posts[0].name; this.ides[0]= resp.posts[0].id;
        this.result[1]= resp.posts[1].name; this.ides[1] = resp.posts[1].id;
          this.result[2]= resp.posts[2].name; this.ides[2] = resp.posts[2].id;
          this.result[3]= resp.posts[3].name; this.ides[3] = resp.posts[3].id;
          this.result[4]= resp.posts[4].name; this.ides[4] = resp.posts[4].id;
           },
        (error: string) => {console.log(error); });
    }
    if ( cur == 'Segundo') {
      this.http.get(this.Servicio.URL_API + '/subjects/subject/' + 2, {headers} ).subscribe(
        (resp: string) => { this.result[0]= resp.posts[0].name; this.ides[0]= resp.posts[0].id;
          this.result[1]= resp.posts[1].name; this.ides[1] = resp.posts[1].id;
          this.result[2]= resp.posts[2].name; this.ides[2] = resp.posts[2].id;
          this.result[3]= resp.posts[3].name; this.ides[3] = resp.posts[3].id;
          this.result[4]= resp.posts[4].name; this.ides[4] = resp.posts[4].id;
           },
        (error: string) => {console.log(error); });
    }
    if ( cur == 'Tercer') {
      this.http.get(this.Servicio.URL_API + '/subjects/subject/' + 3, {headers} ).subscribe(
        (resp: string) => {this.result[0]= resp.posts[0].name; this.ides[0]= resp.posts[0].id;
          this.result[1]= resp.posts[1].name; this.ides[1] = resp.posts[1].id;
          this.result[2]= resp.posts[2].name; this.ides[2] = resp.posts[2].id;
          this.result[3]= resp.posts[3].name; this.ides[3] = resp.posts[3].id;
          this.result[4]= resp.posts[4].name; this.ides[4] = resp.posts[4].id;
           },
        (error: string) => {console.log(error); });
    }
    if ( cur == 'Cuarto') {
      this.http.get(this.Servicio.URL_API + '/subjects/subject/' + 4, {headers} ).subscribe(
        (resp: string) => {this.result[0]= resp.posts[0].name; this.ides[0]= resp.posts[0].id;
          this.result[1]= resp.posts[1].name; this.ides[1] = resp.posts[1].id;
          this.result[2]= resp.posts[2].name; this.ides[2] = resp.posts[2].id;
          this.result[3]= resp.posts[3].name; this.ides[3] = resp.posts[3].id;
          this.result[4]= resp.posts[4].name; this.ides[4] = resp.posts[4].id;
           },
        (error: string) => {console.log(error); });
    }
  }


}
