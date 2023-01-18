import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { RoutePage } from 'src/app/Core/Data';
import { GetErrorRedirectPage, parsearErroresAPI } from 'src/app/Core/Helpers';
import { SecurityService } from 'src/app/Security';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.scss']
})
export class RecuperarPasswordComponent implements OnInit, OnDestroy {
  onDestroy$: Subject<boolean> = new Subject();
  routes = RoutePage;
  form!: FormGroup;
  @ViewChild('f') myNgForm: any;

  isLoading: boolean = false;
  mensaje: string | null = null;

  errores: string[] = [];
  constructor(
    private seguridadService: SecurityService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    window.scroll(0,0);
    this.intiForm();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  intiForm() {
    this.form = this.formBuilder.group({
      email: [
        '',
        {
          validators: [Validators.required, Validators.email],
        },
      ]
    });
  }

  onSubmit() {

    const email = this.form.get('email')!.value;

    this.isLoading = true;

    this.seguridadService
      .restorePassword(email)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (respuesta) => {

         this.clearForm();
        },
        error: (errores) => {
          this.manageErrors(errores);
          this.isLoading = false;
        },
      });
  }

  manageErrors(errores: any): void {
    const error: number | string[] = parsearErroresAPI(errores);

    if(typeof(error) !== 'number') {
      this.errores = error;
    }else{
      this.selectPage(GetErrorRedirectPage(error));
    }
  }

  selectPage(page: string) {
    this.router.navigate([page]);
  }

  clearForm(){
    this.mensaje = "<b>Correo envíado con éxito!!!</b> <br> Te hemos envíado un correo con las indicaciones para que recuperes tú contraseña.";
    this.myNgForm.resetForm();
    this.isLoading = false;

  }

  obtenerMensajeErrorEmail() {
    var campo = this.form!.get('email');

    if (campo!.hasError('required')) {
      return 'El campo Email es requerido';
    }

    if (campo!.hasError('email')) {
      return 'El email no es válido';
    }

    return '';
  }
}
