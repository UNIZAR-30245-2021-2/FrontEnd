import { Component, OnInit } from '@angular/core';
import {ServicioComponentesService} from '../servicios/servicio-componentes.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User} from '../app.component';


@Component({
  selector: 'app-central',
  templateUrl: './central.component.html',
  styleUrls: ['./central.component.css']
})
export class CentralComponent implements OnInit {
  mostrar = true;
  usuarioLogeado: User; // Quien está en la plataforma

  primero = 'Primer';
  segundo =  'Segundo';
  tercero = 'Tercer';
  cuarto = 'Cuarto';


  constructor(private http: HttpClient, public Servicio: ServicioComponentesService) { }

  ngOnInit(): void {
    this.Servicio.sharedMessageCentral.subscribe(messageCentral => this.mostrar = messageCentral);

    this.mostrar = true;

  }
}
