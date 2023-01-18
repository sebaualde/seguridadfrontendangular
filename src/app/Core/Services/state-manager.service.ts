import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateManagerService {

  private _isLogged = new BehaviorSubject(false);
  private _isAutorizado = new BehaviorSubject(false);
  private _userLevel = new BehaviorSubject('Visitante');

  constructor() { }

  //Autenticacion
  get GetIsLoggedObservable(): Observable<boolean> {
    return this._isLogged.asObservable();
  }

  set SetIsLogged(isLogged: boolean) {
    this._isLogged.next(isLogged);
  }

  //Autorizacion
  get GetIsAutorizadoObservable(): Observable<boolean> {
    return this._isAutorizado.asObservable();
  }

  set SetIsAutorizado(isLogged: boolean) {
    this._isAutorizado.next(isLogged);
  }

  //nivel del usuario
  get GetUserLevelObservable(): Observable<string> {
    return this._userLevel.asObservable();
  }

  set SetUserLevel(level: string) {
    this._userLevel.next(level);
  }
}
