import { Component, Input, OnInit } from '@angular/core';
import { SecurityService } from '../../Services';
import { StateManagerService } from '../../../Core/Services/state-manager.service';

@Component({
  selector: 'app-autorizado',
  templateUrl: './autorizado.component.html',
  styleUrls: ['./autorizado.component.scss'],
})
export class AutorizadoComponent implements OnInit {
  @Input() rol: string = '';

  isAutorizado: boolean = false;

  constructor(
    private securityService: SecurityService
  ) {}

  ngOnInit(): void {
    this.isAutorizado = this.estaAutorizado();
  }

  estaAutorizado(): boolean {
    //si se indica un rol en el componente verificamos que el token tenga el mismo devolviendo verdadero o falso
    if (this.rol) {
      return this.securityService.obtenerRol() === this.rol;
    } else {
      return this.securityService.estaLogueado();
    }
  }
}
