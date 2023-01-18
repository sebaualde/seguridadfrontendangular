import { Component, OnInit } from '@angular/core';
import { SecurityService } from 'src/app/Security';
import { RoutePage } from '../../../Data/RoutePages';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.scss']
})
export class CuentaComponent implements OnInit {

  user: string = '';
  routes = RoutePage;

  constructor(private seguridadService: SecurityService,
    ) { }

  ngOnInit(): void {
    this.user = this.seguridadService.obtenerCampoJWT('email');
  }

}
