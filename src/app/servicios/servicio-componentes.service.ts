import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import { User, UserRequest, } from '../app.component';
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

  idLista: number;

  central: boolean;

  busq: boolean;



  esta: boolean;
  estaC: boolean;

   vistaLista: boolean;


   vistaAsig: boolean;
   nomAsig: string;

   crearTema: boolean;


   idUser: number;
   tok: string;

   cur: string;

   idAsig: number;

   verTema: boolean;
   idTema: number;

   adm: boolean;

   verMod: boolean;

   nomUser: string;

   verPerfil: boolean;

  /******** PASAR ID, TOKEN Y ADMINMODE *********/
    // @ts-ignore
   private id = new BehaviorSubject(this.idUser);
   sharedMessageID = this.id.asObservable();

   // @ts-ignore
  private token = new BehaviorSubject(this.tok);
   sharedMessageToken = this.token.asObservable();

   // @ts-ignore
  private admin = new BehaviorSubject(this.adm);
   sharedMessageAdmin = this.admin.asObservable();
  /* --------------------------------------------- */

  /********PANTALLA LOGIN****************/
  /* Mensaje para pasar variable de login */
  private message2 = new BehaviorSubject(this.login);
  sharedMessage2 = this.message2.asObservable();

  // @ts-ignore
  private messageNomUser = new BehaviorSubject(this.nomUser);
  sharedMessageNom = this.messageNomUser.asObservable();

  /* ----------------------------------------------*/

  /******VISTA DE LISTA ASIGNATURAS**************/
  /* Mensaje para pasar variable que active o desactive la vista-lista*/
  // @ts-ignore
  private messageVistaLista = new BehaviorSubject(this.vistaLista);
  sharedMessageVistaLista = this.messageVistaLista.asObservable();

  /******* VISTA CENTRAL***********/

  /* Mensaje para pasar variable a la vista central */
  // @ts-ignore
  private messageCentral = new BehaviorSubject(this.central);
  sharedMessageCentral = this.messageCentral.asObservable();

  /* Mensaje para pasar el curso seleccionado desde la vista central a las demas */
  // @ts-ignore
  private messageCentralCurso = new BehaviorSubject(this.cur);
  sharedMessageCentralCurso = this.messageCentralCurso.asObservable();

  /***** VISTA DE ASIGNATURA*********/
// @ts-ignore
private messageVistaAsig = new BehaviorSubject(this.vistaAsig);
sharedMesssageVistaAsig = this.messageVistaAsig.asObservable();

// @ts-ignore
  private messageObjAsig = new BehaviorSubject(this.nomAsig);
sharedMessageObjAsig = this.messageObjAsig.asObservable();

// @ts-ignore
  private messageIDAsig = new BehaviorSubject(this.idAsig);
sharedMessageIDAsig = this.messageIDAsig.asObservable();

  /*********VISTA DE NUEVO TEMA*********/
// @ts-ignore
private messageCrearTema = new BehaviorSubject(this.crearTema);
sharedMessageCrearTema = this.messageCrearTema.asObservable();


  /********** PANTALLA VER TEMA************/
    // @ts-ignore
private messageVerTema = new BehaviorSubject(this.verTema);
sharedMessageVerTema = this.messageVerTema.asObservable();


// @ts-ignore
  private messageIdTema = new BehaviorSubject(this.idTema);
sharedMessageIdTema = this.messageIdTema.asObservable();



  /******** PANTALLA MODIFICAR TEMA************/
    // @ts-ignore
private messageModTema = new BehaviorSubject(this.verMod);
sharedMessageModTema = this.messageModTema.asObservable();


  /***** PANTALLA DE PERFIL USUARIO*************/

// @ts-ignore
private messageVerPerfil = new BehaviorSubject(this.verPerfil);
sharedMessageVerPerfil = this.messageVerPerfil.asObservable();



  constructor(private http: HttpClient) {
    this.URL_API = 'http://localhost:9000/api/v1';
    this.nuevo = new User();
  }

  nextMessage2(message2) {
    this.message2.next(message2);
  }


  nextMessageVistaLista(messageVistaLista) {
    this.messageVistaLista.next(messageVistaLista);
  }

  nextMessageCentral(messageCentral) {
    this.messageCentral.next(messageCentral);
  }


  nextMessageVistaAsig(messageVistaAsig) {
    this.messageVistaAsig.next(messageVistaAsig);
  }

  nextMessageObjAsig(nomAsig) {
    this.messageObjAsig.next(nomAsig);
  }

  nextMesssageCrearTema(crear) {
    this.messageCrearTema.next(crear);
  }

  nextMessageID(id) {
    this.id.next(id);
  }

  nextMessageTok(token) {
    this.token.next(token);
  }

  nextMessageCentCurso(cur) {
    this.messageCentralCurso.next(cur);
  }

  nextMessageIDAsig(id) {
    this.messageIDAsig.next(id);
  }

  nextMessageVerTema(ver) {
    this.messageVerTema.next(ver);
  }

  nextMessageIdTema(id) {
    this.messageIdTema.next(id);
  }

  nextMessageAdminMode(ad) {
    this.admin.next(ad);
  }

  nextMessageVerModi(ver) {
    this.messageModTema.next(ver);
  }

  nextMessageNomUser(name) {
    this.messageNomUser.next(name);
  }

  nextMessageVerPerfilUser(ver) {
    this.messageVerPerfil.next(ver);
  }
}
