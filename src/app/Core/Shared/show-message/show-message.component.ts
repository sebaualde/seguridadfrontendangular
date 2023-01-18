import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-show-message',
  templateUrl: './show-message.component.html',
  styleUrls: ['./show-message.component.scss'],
})
export class ShowMessageComponent implements OnInit, OnChanges {
  @Input() message: string = '';
  @Input() isErrorMessage: boolean = false;

  constructor() {}

  ngOnChanges(): void {
    this.showMessage();
  }

  ngOnInit(): void {
    this.showMessage();
  }

  showMessage() {

    //PARA VER TODAS LAS CONFIGURACIONES POSIBLES VISITA: https://sweetalert2.github.io/#declarative-templates
    if (this.isErrorMessage) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end', //'top', 'top-start', 'top-end', 'center', 'center-start', 'center-end', 'bottom', 'bottom-start', or 'bottom-end'
        showConfirmButton: false,
        background: '#FF3547', //success: #00C851, danger: #FF3547, warning: #FFBB33, info: #33B5E5
        iconColor: 'white',
        showCloseButton: true,
        timer: 5000,
        width: '25rem',
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
      });

      this.fireToast('error', 'white', Toast);
    } else {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end', //'top', 'top-start', 'top-end', 'center', 'center-start', 'center-end', 'bottom', 'bottom-start', or 'bottom-end'
        showConfirmButton: false,
        background: '#00C851', //success: #00C851, danger: #FF3547, warning: #FFBB33, info: #33B5E5
        iconColor: 'white',
        showCloseButton: true,
        timer: 5000,
        width: '25rem',
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
      });

      this.fireToast('success', 'white', Toast);
    }
  }

  fireToast(icon: SweetAlertIcon, color: string, toast: typeof Swal) {
    if (this.message != '' && this.message != undefined) {
      toast.fire({
        icon: icon, //warning, error, success, info, question
        //iconHtml:'<i class="fas fa-times"></i>',
        title: this.message, //this.mensaje,
        color: color,
      });
    }
  }
}
