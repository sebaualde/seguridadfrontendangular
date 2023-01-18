import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-page-message',
  templateUrl: './info-page-message.component.html',
  styleUrls: ['./info-page-message.component.scss']
})
export class InfoPageMessageComponent implements OnInit {

  @Input() iconName = '';
  @Input() title = '';
  @Input() alertType = '';
  @Input() message = '';


  constructor() { }

  ngOnInit(): void {

  }

}
