import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { RoutePage, UserLevel } from 'src/app/Core/Data';
import {
  GetErrorRedirectPage,
  parsearErroresAPI,
} from 'src/app/Core/Helpers/Utilidades';
import { StateManagerService } from 'src/app/Core/Services';
import { registerCredentialsDTO, SecurityService } from 'src/app/Security';
import { PasswordMatch } from './Validators/PasswordMatch';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit, OnDestroy {
  onDestroy$: Subject<boolean> = new Subject();

  routes = RoutePage;

  form!: FormGroup;

  isLoading: boolean = false;
  passIcon: string = 'visibility_off';
  confirmIcon: string = 'visibility_off';

  errores: string[] = [];
  constructor(
    private seguridadService: SecurityService,
    private stateManager: StateManagerService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    window.scroll(0, 0);
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
      ],
      password: [
        '',
        {
          validators: [Validators.required, Validators.minLength(6)],
        },
      ],
      confirm: [
        '',
        {
          validators: [Validators.required],
        },
      ],
    });

    this.form!.get('confirm')!.addValidators(PasswordMatch(this.form));
  }

  onSubmit() {
    let credenciales: registerCredentialsDTO = {
      email: this.form.get('email')!.value,
      password: this.form.get('password')!.value,
      confirm: this.form.get('confirm')!.value,
    };

    this.isLoading = true;

    this.seguridadService
      .registrar(credenciales)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: () => {
          this.selectPage(this.routes.RegisterMessage + '/true');
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

    if (typeof error !== 'number') {
      this.errores = error;
    } else {
      this.selectPage(GetErrorRedirectPage(error));
    }
  }

  selectPage(page: string) {
    this.router.navigate([page]);
  }

  showPass() {
    let input = document.getElementById('pass') as HTMLInputElement;

    if (this.passIcon === 'visibility') {
      input.type = 'password';
      this.passIcon = 'visibility_off';
    } else {
      input.type = 'text';
      this.passIcon = 'visibility';
    }
  }

  showConfirm() {
    let input = document.getElementById('confirm') as HTMLInputElement;

    if (this.confirmIcon === 'visibility') {
      input.type = 'password';
      this.confirmIcon = 'visibility_off';
    } else {
      input.type = 'text';
      this.confirmIcon = 'visibility';
    }
  }

  setStateManagerVariables() {
    this.stateManager.SetIsAutorizado = this.seguridadService.checkRol('admin');
    this.stateManager.SetIsLogged = true;
    this.stateManager.SetUserLevel = this.getEstadoUser();
  }

  getEstadoUser(): string {
    if (this.seguridadService.checkRol('admin')) {
      return UserLevel.Admin;
    }

    if (this.seguridadService.estaLogueado()) {
      return UserLevel.Logged;
    }

    return UserLevel.Visit;
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

  obtenerMensajeErrorPassword() {
    var campo = this.form!.get('password');

    if (campo!.hasError('required')) {
      return 'El campo password es requerido';
    }

    if (campo!.hasError('minlength')) {
      return 'El password debe tener 6 caracteres como minimo.';
    }

    return '';
  }

  obtenerMensajeErrorConfirm() {
    var campo = this.form!.get('confirm');

    if (campo!.hasError('required')) {
      return 'El campo de confirmación es requerido';
    }

    if (campo!.hasError('passwordMatch')) {
      return campo!.getError('passwordMatch').mensaje;
    }

    return '';
  }
}
