import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {

  message:string = "";
  isSuccess:boolean = false;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.message = this.activatedRoute.snapshot.paramMap.get("message") ?? "";
    this.isSuccess = Boolean(this.activatedRoute.snapshot.paramMap.get("isSuccess"));
  }

}
