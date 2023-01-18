import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ConvertUtcToLocalDate,
  UtcToLocalDateTimeFormat
} from 'src/app/Core/Helpers/Utilidades';
import { environment } from 'src/environments/environment';
import { UserLevel } from '../../Core/Data/UserLevels';
import { StateManagerService } from '../../Core/Services/state-manager.service';
import {
  authenticationResponseDTO,
  changePasswordDTO,
  registerCredentialsDTO,
  userCredentialsDTO
} from '../Models';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  apiURL = environment.apiUrl + 'account';

  private readonly llaveToken = 'token';
  private readonly llaveExpiracion = 'token-expiracion';
  private readonly compoRole = 'role';

  constructor(
    private httpClient: HttpClient,
    private stateManager: StateManagerService
  ) {}

  estaLogueado(): boolean {
    const token = localStorage.getItem(this.llaveToken);

    if (!token) {
      return false;
    }

    if (this.isTokenExpired()) {
      this.logout();
      return false;
    }

    this.refreshToken();
    return true;
  }

  requestError(errorRequest: number) {
    const url = new URL(`${environment.apiUrl}Errors`);
    url.searchParams.set('errorCode', String(errorRequest));

    return this.httpClient.get(url.toString());
  }

  login(
    credenciales: userCredentialsDTO
  ): Observable<authenticationResponseDTO> {
    return this.httpClient.post<authenticationResponseDTO>(
      this.apiURL + '/login',
      credenciales
    );
  }

  logout() {
    localStorage.removeItem(this.llaveToken);
    localStorage.removeItem(this.llaveExpiracion);

    this.stateManager.SetIsLogged = false;
    this.stateManager.SetIsAutorizado = false;
    this.stateManager.SetUserLevel = UserLevel.Visit;

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: '',
    };

    return this.httpClient.post(`${this.apiURL}/logout`, options);
  }

  registrar(
    credenciales: registerCredentialsDTO
  ): Observable<authenticationResponseDTO> {
    return this.httpClient.post<authenticationResponseDTO>(
      this.apiURL + '/registrar',
      credenciales
    );
  }

  changePassword(
    credenciales: changePasswordDTO
  ) {
    const formData = new FormData();

    formData.append('oldPassword', String(credenciales.oldPassword));
    formData.append('newPassword', String(credenciales.newPassword));
    formData.append('Confirm', String(credenciales.confirm));

    return this.httpClient.put(`${this.apiURL}/changePassword`, formData);
  }

  restorePassword(email: string){
    const url = new URL(`${this.apiURL}/recoverPassword`);
    url.searchParams.set('email', email);

    return this.httpClient.post(url.toString(), '');
  }

  resetPassword(credenciales: registerCredentialsDTO){
    const url = new URL(`${this.apiURL}/resetPassword`);
    return this.httpClient.post(url.toString(), credenciales);
  }

  refreshToken() {
    const response = this.httpClient.get<authenticationResponseDTO>(
      this.apiURL + '/refreshToken',
      {}
    );

    response.subscribe((response: authenticationResponseDTO) => {
      this.guardarToken(response);
    });
  }

  isTokenExpired(): boolean {
    const expiracion = localStorage.getItem(this.llaveExpiracion);

    const actualDateString = ConvertUtcToLocalDate(
      new Date().toString(),
      UtcToLocalDateTimeFormat.FULL
    );
    const actualDate = new Date(actualDateString);

    const expiracionFecha = new Date(
      expiracion == null ? actualDate : expiracion
    );

    return expiracionFecha <= actualDate;
  }

  obtenerRol(): string {
    return this.obtenerCampoJWT(this.compoRole);
  }

  checkRol(rol: string): boolean {
    return this.obtenerRol() === rol;
  }

  obtenerCampoJWT(campo: string): string {
    const token = localStorage.getItem(this.llaveToken);

    if (!token) {
      return '';
    }

    var dataToken = JSON.parse(atob(token.split('.')[1]));

    return dataToken[campo];
  }

  guardarToken(respuestaAutenticacion: authenticationResponseDTO) {
    localStorage.setItem(this.llaveToken, respuestaAutenticacion.token);

    let yourDate = ConvertUtcToLocalDate(
      respuestaAutenticacion.expiration.toString(),
      UtcToLocalDateTimeFormat.FULL
    );

    localStorage.setItem(this.llaveExpiracion, yourDate.toString());
  }

  obtenerToken() {
    return localStorage.getItem(this.llaveToken);
  }
}
