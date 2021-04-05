import { Component, OnInit } from '@angular/core';
import {ServicioComponentesService} from "../servicios/servicio-componentes.service";
import {User} from "../app.component";
import {HttpClient, HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-vista-lista',
  templateUrl: './vista-lista.component.html',
  styleUrls: ['./vista-lista.component.css']
})
export class VistaListaComponent implements OnInit {

  aparecer: boolean;

  usuarioLog: User = new User();
  usuario: User = new User();

  play: boolean = false;


  constructor(public Servicio: ServicioComponentesService, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.Servicio.sharedMessageVistaLista.subscribe(messageVistaLista => this.aparecer = messageVistaLista);

  }

}
