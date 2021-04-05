import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import { User, UserRequest,} from '../app.component';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicioComponentesService {

  URL_API: string;

  nuevo: User = new User();
  login = false;

  editUser: boolean;
  editUser2: boolean;

  usuarioList:User = new User();
  idLista: number;

  central: boolean;

  busq: boolean;

  vistaUsuario: boolean;
  nomUsuario: string;

  esta:boolean;
  estaC:boolean;

   vistaLista: boolean;


   vistaAsig:boolean;
   nomAsig: string;

  /* --------------------------------------------- */
  /* Mensaje para pasar usuario */
  private message = new BehaviorSubject(this.nuevo);
  sharedMessage = this.message.asObservable();

  /* Mensaje para pasar variable de login */
  private message2 = new BehaviorSubject(this.login);
  sharedMessage2 = this.message2.asObservable();

  /* ----------------------------------------------*/
  /* Mensaje para pasar variable a editar usuario */
  private messageEdit = new BehaviorSubject(this.editUser);
  sharedMessageEdit = this.messageEdit.asObservable();

  private messageEdit2 = new BehaviorSubject(this.editUser2);
  sharedMessageEdit2 = this.messageEdit2.asObservable();


  /******VISTA DE LISTA ASIGNATURAS**************/
  /* Mensaje para pasar variable que active o desactive la vista-lista*/
  private messageVistaLista = new BehaviorSubject(this.vistaLista);
  sharedMessageVistaLista = this.messageVistaLista.asObservable();

  /******* VISTA CENTRAL***********/

  /* Mensaje para pasar variable a la vista central */
  private messageCentral = new BehaviorSubject(this.central);
  sharedMessageCentral = this.messageCentral.asObservable();


  /*********PARA VISTA USUARIO*************/
  private messageVistaUsuario = new BehaviorSubject(this.vistaUsuario);
  sharedMessageVistaUsuario = this.messageVistaUsuario.asObservable();

  /* Mensaje para pasar variable usuario a vista-usuario */
  private messageNomUsuario = new BehaviorSubject(this.nomUsuario);
  sharedMessageNomUsuario = this.messageNomUsuario.asObservable();

/***** VISTA DE ASIGNTARUA*********/

private messageVistaAsig = new BehaviorSubject(this.vistaAsig);
sharedMesssageVistaAsig = this.messageVistaAsig.asObservable();

private messageObjAsig = new BehaviorSubject(this.nomAsig);
sharedMessageObjAsig = this.messageObjAsig.asObservable();

  constructor(private http: HttpClient) {
    this.URL_API = 'http://localhost:9000/api/v1';
    this.nuevo = new User();
    this.usuarioList = new User();
  }

  nextMessage(message) {
    this.message.next(message);
  }

  nextMessage2(message2) {
    this.message2.next(message2);
  }



  nextMessageEdit(messageEdit) {
    this.messageEdit.next(messageEdit);
  }
  nextMessageEdit2(messageEdit2) {
    this.messageEdit2.next(messageEdit2);

  }



  nextMessageVistaLista(messageVistaLista) {
    this.messageVistaLista.next(messageVistaLista);
  }



  nextMessageCentral(messageCentral) {
    this.messageCentral.next(messageCentral);
  }



  nextMessageNomUsuario(usuario) {
    this.messageNomUsuario.next(usuario);
  }

  nextMessageVistaAsig(messageVistaAsig) {
    this.messageVistaAsig.next(messageVistaAsig);
  }

  nextMessageObjAsig(nomAsig){
    this.messageObjAsig.next(nomAsig);
  }

}