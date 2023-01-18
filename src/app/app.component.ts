import { Component } from '@angular/core';
import { StateManagerService } from './Core/Services/state-manager.service';
import { SecurityService } from './Security';
import { UserLevel } from './Core/Data/UserLevels';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Seguridad Angular Demo';

  constructor(
    private stateManager: StateManagerService,
    private securityService: SecurityService
  ) {
    this.checkAccess();
  }

  checkAccess() {
    this.stateManager.SetIsLogged = this.securityService.estaLogueado();
    this.stateManager.SetIsAutorizado = this.securityService.checkRol('admin');
    this.stateManager.SetUserLevel = this.getEstadoUser();
  }

  getEstadoUser(): string{

    if(this.securityService.checkRol('admin')){
      return UserLevel.Admin;
    }

    if(this.securityService.estaLogueado()){
      return UserLevel.Logged;
    }

    return UserLevel.Visit;
  }
}
