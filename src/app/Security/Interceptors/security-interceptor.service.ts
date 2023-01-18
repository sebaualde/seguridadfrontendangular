import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SecurityService } from '../Services';

@Injectable({
  providedIn: 'root'
})
export class SecurityInterceptorService implements HttpInterceptor{

  constructor(private seguridadService: SecurityService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.seguridadService.obtenerToken();

    if(token){

      //si el token existe clonamos la peticion http y le agregamos a la cabecera nuestro token
      req = req.clone({
        setHeaders: {Authorization: `Bearer ${token}`}
      });
    }

    return next.handle(req);
  }
}
