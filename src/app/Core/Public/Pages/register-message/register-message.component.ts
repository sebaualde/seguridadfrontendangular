import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register-message',
  templateUrl: './register-message.component.html',
  styleUrls: ['./register-message.component.scss']
})
export class RegisterMessageComponent implements OnInit {

  isSuccess: boolean = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.isSuccess = this.route.snapshot.paramMap.get("isSuccess") === "true";
  }

}
