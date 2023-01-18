import { Component, OnInit } from '@angular/core';
import { RoutePage } from 'src/app/Core/Data';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.scss']
})
export class AdministracionComponent implements OnInit {

  user: string = '';
  routes = RoutePage;

  constructor() { }

  ngOnInit(): void {
  }

}
