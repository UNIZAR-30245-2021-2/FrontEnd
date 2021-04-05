import { Component, OnInit } from '@angular/core';
import {User} from '../app.component';
import {ServicioComponentesService} from '../servicios/servicio-componentes.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-vista-asignatura',
  templateUrl: './vista-asignatura.component.html',
  styleUrls: ['./vista-asignatura.component.css']
})
export class VistaAsignaturaComponent implements OnInit {
  mostrar: boolean;


  tema: string;
  cat: string;
  fech: string;
  res: string;


  constructor(public Servicio: ServicioComponentesService, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.Servicio.sharedMesssageVistaAsig.subscribe(messageVistaAsig => this.mostrar = messageVistaAsig);

  }

}
