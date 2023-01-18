import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoutePage } from '../../../Data/RoutePages';

@Component({
  selector: 'app-cuenta-confirmada',
  templateUrl: './cuenta-confirmada.component.html',
  styleUrls: ['./cuenta-confirmada.component.scss']
})
export class CuentaConfirmadaComponent implements OnInit {

  routes = RoutePage;
  isSuccess: boolean = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.isSuccess = this.route.snapshot.paramMap.get("isSuccess") === "true";

  }

}
