import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RoutePage } from 'src/app/Core';
import { SecurityService } from '../Services';

@Injectable({
  providedIn: 'root'
})
export class RegistradoGuard implements CanActivate {
  constructor(
    private seguridadService: SecurityService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    if (this.seguridadService.estaLogueado()) {
      return true;
    }

    this.router.navigate([RoutePage.Login]);
    return false;
  }
}
