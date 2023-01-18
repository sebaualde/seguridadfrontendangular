import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { SecurityService } from 'src/app/Security';
import { RoutePage } from '../../Data';
import { StateManagerService } from '../../Services';
import { UserLevel } from '../../Data/UserLevels';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit, OnDestroy {
  onDestroy$: Subject<boolean> = new Subject();

  routePages = RoutePage;

  isLogged: boolean = false;
  isAutorizado: boolean = false;

  estadoUsuario: string = 'Visitante';
  bgLevel: string = '';

  constructor(
    private router: Router,
    private seguridadService: SecurityService,
    private stateManager: StateManagerService
  ) {}

  ngOnInit(): void {
    this.checkIsLogged();
    this.checkIsAutorizado();
    this.checkUserLevel();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  checkIsLogged() {
    this.stateManager.GetIsLoggedObservable.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe({
      next: (response) => {
        this.isLogged = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  checkIsAutorizado() {
    this.stateManager.GetIsAutorizadoObservable.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe({
      next: (response) => {
        this.isAutorizado = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  checkUserLevel() {
    this.stateManager.GetUserLevelObservable
    .pipe(takeUntil(this.onDestroy$))
    .subscribe({
      next: (response) => {
        this.estadoUsuario = response;
        this.setBgEstadoUser(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  setBgEstadoUser(level: string) {
    switch (level) {
      case UserLevel.Admin:
        this.bgLevel = 'bg-red';
        break;
      case UserLevel.Logged:
        this.bgLevel = 'bg-green';
        break;
      default:
        this.bgLevel = 'bg-blue';
        break;
    }
  }

  logout() {
    this.seguridadService
      .logout()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: () => {
          this.router.navigate([RoutePage.Inicio]);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
