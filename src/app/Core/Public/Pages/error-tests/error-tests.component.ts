import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { RoutePage } from 'src/app/Core/Data';
import { GetErrorRedirectPage, parsearErroresAPI } from 'src/app/Core/Helpers';
import { SecurityService } from 'src/app/Security';

@Component({
  selector: 'app-error-tests',
  templateUrl: './error-tests.component.html',
  styleUrls: ['./error-tests.component.scss']
})
export class ErrorTestsComponent implements OnInit, OnDestroy {
  onDestroy$: Subject<boolean> = new Subject();

  routes = RoutePage;

  form!: FormGroup;

  isLoading: boolean = false;
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
      error: [
        '',
        {
          validators: [Validators.required],
        },
      ]
    });
  }

  onSubmit() {
    let errorCodeRequest: number = this.form.get('error')!.value;

    this.isLoading = true;

    this.seguridadService
      .requestError(errorCodeRequest)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: () => {

          this.isLoading = false;
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
      this.router.navigate([GetErrorRedirectPage(error)]);
    }
  }

  obtenerMensajeErrorCode() {
    var campo = this.form!.get('error');

    if (campo!.hasError('required')) {
      return 'El campo error es requerido';
    }
    return '';
  }

}
