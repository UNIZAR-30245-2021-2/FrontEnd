import { Component, OnInit } from '@angular/core';
import {ServicioComponentesService} from '../servicios/servicio-componentes.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Component({
  selector: 'app-crear-tema',
  templateUrl: './crear-tema.component.html',
  styleUrls: ['./crear-tema.component.css']
})
export class CrearTemaComponent implements OnInit {
  mostrar: boolean;
  asunt:string;
  type:string;
  body:string;

  id:number;
  token:string;
  idAsig: number;

  curso: string;
  subject: string;

  constructor(public Servicio: ServicioComponentesService, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.Servicio.sharedMessageCrearTema.subscribe(messageCrearTema => this.mostrar = messageCrearTema);
    this.Servicio.sharedMessageID.subscribe(messageID => this.id = messageID);
    this.Servicio.sharedMessageToken.subscribe(messageToken => this.token = messageToken);
    this.Servicio.sharedMessageCentralCurso.subscribe( curso => this.curso = curso);
    this.Servicio.sharedMessageObjAsig.subscribe( asignatura => this.subject = asignatura);
    this.Servicio.sharedMessageIDAsig.subscribe( id => this.idAsig = id);
  }

  publicar(){
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.token}`, 'Content-Type': 'application/json'});

      const post = {
        title: this.asunt,
        category: this.type,
        body: this.body,
        user_id: this.id,
        subject_id: this.idAsig,
      };

    this.http.post(this.Servicio.URL_API + '/posts/', JSON.stringify(post),{headers}).subscribe(
      (resp: string) => { this.mostrar = false;
        this.Servicio.nextMessageVistaAsig(true); this.clear();
      },
      (error:string)=> {console.log(error);} );
  }

  clear(){
    this.asunt = '';
    this.type = '';
    this.body='';
  }
}
