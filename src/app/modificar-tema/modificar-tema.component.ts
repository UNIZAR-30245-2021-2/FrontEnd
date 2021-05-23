import { Component, OnInit } from '@angular/core';
import {ServicioComponentesService} from '../servicios/servicio-componentes.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-modificar-tema',
  templateUrl: './modificar-tema.component.html',
  styleUrls: ['./modificar-tema.component.css']
})
export class ModificarTemaComponent implements OnInit {
  mostrar: boolean;
  asunt: string;
  type: string;
  body: string;

  id: number;
  token: string;
  idAsig: number;

  curso: string;
  subject: string;

  idTema: number;

  constructor(public Servicio: ServicioComponentesService, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.Servicio.sharedMessageModTema.subscribe(message => this.mostrar = message);
    this.Servicio.sharedMessageIdTema.subscribe( message => {this.idTema = message; this.datos(); });
    this.Servicio.sharedMessageID.subscribe(messageID => this.id = messageID);
    this.Servicio.sharedMessageToken.subscribe(messageToken => this.token = messageToken);
    this.Servicio.sharedMessageCentralCurso.subscribe( curso => this.curso = curso);
    this.Servicio.sharedMessageObjAsig.subscribe( asignatura => this.subject = asignatura);
    this.Servicio.sharedMessageIDAsig.subscribe( id => this.idAsig = id);
  }

  /* Función para recuperar los datos del tema a modificar. */
  datos() {
    const headers = new HttpHeaders({Authorization: `Bearer ${this.token}`, 'Content-Type': 'application/json'});
    this.http.get(this.Servicio.URL_API + '/posts/' + this.idTema, {headers}).subscribe(
      (resp: string) => {
        // @ts-ignore
        this.asunt = resp.post.title;
        // @ts-ignore
        this.type = resp.post.category;
        // @ts-ignore
        this.body = resp.post.body;
      },
      (error: string) => { console.log(error); });
  }

  /* Función que realiza la actualización del tema con los nuevos datos modificados */
  guardar() {
    const headers = new HttpHeaders({Authorization: `Bearer ${this.token}`, 'Content-Type': 'application/json'});

    const post = {
      title: this.asunt,
      category: this.type,
      body: this.body,
    };

    this.http.put(this.Servicio.URL_API + '/posts/' + this.idTema, JSON.stringify(post), {headers}).subscribe(
      (resp: string) => { this.mostrar = false;
                          this.Servicio.nextMessageVerTema(true);
                          this.Servicio.nextMessageIdTema(this.idTema); this.clear();
      },
      (error: string) => {console.log(error); } );
  }


  /* Limpia los campos de texto y selección */
  clear() {
    this.asunt = '';
    this.type = '';
    this.body = '';
  }

}
