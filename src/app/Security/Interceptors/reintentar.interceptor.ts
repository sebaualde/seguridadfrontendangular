import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, timer } from 'rxjs';

@Injectable()
export class ReintentarIneterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //retry({count: 2, delay: this.shouldRetry})
    // count: es la cantidad de reintentos
    // delay: es el tiempo entre reintentos
    return next.handle(req).pipe(retry({ count: 2, delay: this.shouldRetry }));
  }

  shouldRetry(error: HttpErrorResponse) {
    //si el error es del servidor esperamos 2000ms (2s) y se vuelve a intentar el llamado
    if (error.status >= 500) {
      return timer(2000);
    }

    //de lo contrario devolvemos el error
    throw error;
  }
}
