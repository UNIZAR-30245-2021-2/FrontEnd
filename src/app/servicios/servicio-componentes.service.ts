import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import { User, UserRequest, } from '../app.component';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicioComponentesService {

  URL_API: string;

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

   /* Mensaje para pasar variable bool de si usuario es administrador */
   // @ts-ignore
  private admin = new BehaviorSubject(this.adm);
   sharedMessageAdmin = this.admin.asObservable();
  /* --------------------------------------------- */

  /********PANTALLA LOGIN****************/
  /* Mensaje para activar pantalla de login */
  private message2 = new BehaviorSubject(this.login);
  sharedMessage2 = this.message2.asObservable();

  /* Mensaje para pasar el nombre del usuario logeado. */
  // @ts-ignore
  private messageNomUser = new BehaviorSubject(this.nomUser);
  sharedMessageNom = this.messageNomUser.asObservable();

  /* ----------------------------------------------*/

  /****** VISTA DE LISTA ASIGNATURAS**************/
  /* Mensaje para pasar variable que active o desactive la vista-lista*/
  // @ts-ignore
  private messageVistaLista = new BehaviorSubject(this.vistaLista);
  sharedMessageVistaLista = this.messageVistaLista.asObservable();

  /******* VISTA CENTRAL***********/

  /* Mensaje para activar la vista central */
  // @ts-ignore
  private messageCentral = new BehaviorSubject(this.central);
  sharedMessageCentral = this.messageCentral.asObservable();

  /* Mensaje para pasar el curso seleccionado desde la vista central a las demas */
  // @ts-ignore
  private messageCentralCurso = new BehaviorSubject(this.cur);
  sharedMessageCentralCurso = this.messageCentralCurso.asObservable();

  /***** VISTA DE ASIGNATURA*********/
  /* Mensaje para activar la vista de asignatura */
  // @ts-ignore
  private messageVistaAsig = new BehaviorSubject(this.vistaAsig);
  sharedMesssageVistaAsig = this.messageVistaAsig.asObservable();

  /* Mensaje para pasar el nombre de la asigntura seleccionada. */
  // @ts-ignore
    private messageObjAsig = new BehaviorSubject(this.nomAsig);
  sharedMessageObjAsig = this.messageObjAsig.asObservable();

  /* Mensaje para pasar el id de la asignatura seleccionada. */
  // @ts-ignore
    private messageIDAsig = new BehaviorSubject(this.idAsig);
  sharedMessageIDAsig = this.messageIDAsig.asObservable();

  /*********VISTA DE NUEVO TEMA*********/
  /* Mensaje para activar la vista de Crear Tema. */
  // @ts-ignore
  private messageCrearTema = new BehaviorSubject(this.crearTema);
  sharedMessageCrearTema = this.messageCrearTema.asObservable();


  /********** PANTALLA VER TEMA************/

  /* Mensaje para activar pantalla de Ver Tema */
    // @ts-ignore
  private messageVerTema = new BehaviorSubject(this.verTema);
  sharedMessageVerTema = this.messageVerTema.asObservable();

  /* Mensjae para pasar el id del tema selecciona a visualizar. */
  // @ts-ignore
  private messageIdTema = new BehaviorSubject(this.idTema);
  sharedMessageIdTema = this.messageIdTema.asObservable();



  /******** PANTALLA MODIFICAR TEMA************/

  /*Mensaje para activar pantalla de Modificar Tema. */
    // @ts-ignore
  private messageModTema = new BehaviorSubject(this.verMod);
  sharedMessageModTema = this.messageModTema.asObservable();


  /***** PANTALLA DE PERFIL USUARIO*************/

  /* Mensaje para activar pantalla de perfil del usuario. */
  // @ts-ignore
  private messageVerPerfil = new BehaviorSubject(this.verPerfil);
  sharedMessageVerPerfil = this.messageVerPerfil.asObservable();



  constructor(private http: HttpClient) {
    this.URL_API = 'http://localhost:9000/api/v1';
  }

  /*** Pantalla de login **/
  /* Pasar valor bool para mostrar o no pantalla login */
  nextMessage2(message2) {
    this.message2.next(message2);
  }

  /* Pasar el nombre de usuario. */
  nextMessageNomUser(name) {
    this.messageNomUser.next(name);
  }

  /****** VISTA DE LISTA ASIGNATURAS**************/
  /* Mensaje para pasar variable que active o desactive la vista-lista*/
  nextMessageVistaLista(messageVistaLista) {
    this.messageVistaLista.next(messageVistaLista);
  }

  /******* VISTA CENTRAL***********/
  /* Mensaje para activar la vista central */
  nextMessageCentral(messageCentral) {
    this.messageCentral.next(messageCentral);
  }

  /* Mensaje para pasar el curso seleccionado desde la vista central a las demas */
  nextMessageCentCurso(cur) {
    this.messageCentralCurso.next(cur);
  }


  /***** VISTA DE ASIGNATURA*********/
  /* Mensaje para activar la vista de asignatura */
  nextMessageVistaAsig(messageVistaAsig) {
    this.messageVistaAsig.next(messageVistaAsig);
  }

  /* Mensaje para pasar el nombre de la asigntura seleccionada. */
  nextMessageObjAsig(nomAsig) {
    this.messageObjAsig.next(nomAsig);
  }

  /* Mensaje para pasar el id de la asignatura seleccionada. */
  nextMessageIDAsig(id) {
    this.messageIDAsig.next(id);
  }

  /*********VISTA DE NUEVO TEMA*********/
  /* Mensaje para activar la vista de Crear Tema. */
  nextMesssageCrearTema(crear) {
    this.messageCrearTema.next(crear);
  }

  /******** PASAR ID, TOKEN Y ADMINMODE *********/
  nextMessageID(id) {
    this.id.next(id);
  }

  nextMessageTok(token) {
    this.token.next(token);
  }

  nextMessageAdminMode(ad) {
    this.admin.next(ad);
  }


  /********** PANTALLA VER TEMA************/
  /* Mensaje para activar pantalla de Ver Tema */
  nextMessageVerTema(ver) {
    this.messageVerTema.next(ver);
  }

  /* Mensjae para pasar el id del tema selecciona a visualizar. */
  nextMessageIdTema(id) {
    this.messageIdTema.next(id);
  }

  /******** PANTALLA MODIFICAR TEMA************/
  /*Mensaje para activar pantalla de Modificar Tema. */
  nextMessageVerModi(ver) {
    this.messageModTema.next(ver);
  }

  /***** PANTALLA DE PERFIL USUARIO*************/
  /* Mensaje para activar pantalla de perfil del usuario. */
  nextMessageVerPerfilUser(ver) {
    this.messageVerPerfil.next(ver);
  }
}
