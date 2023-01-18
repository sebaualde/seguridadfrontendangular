import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-error-list',
  templateUrl: './show-error-list.component.html',
  styleUrls: ['./show-error-list.component.scss']
})
export class ShowErrorListComponent implements OnInit {

  @Input() errores: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
