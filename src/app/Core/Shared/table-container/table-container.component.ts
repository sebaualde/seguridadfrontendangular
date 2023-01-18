import { NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-table-container',
  templateUrl: './table-container.component.html',
  styleUrls: ['./table-container.component.scss']
})
export class TableContainerComponent implements OnInit {

  @Input() listado: any;
  @Input()errores: string[] = [];
  @Input()isError:boolean=false;
  @Input()datosCargados:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
