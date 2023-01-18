import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { RoutePage } from 'src/app/Core/Data';
import { parsearErroresAPI, GetErrorRedirectPage } from 'src/app/Core/Helpers';
import { StateManagerService } from 'src/app/Core/Services';
import { userCredentialsDTO } from 'src/app/Security';
import { SecurityService } from '../../../../Security/Services/security.service';
import { UserLevel } from '../../../Data/UserLevels';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  onDestroy$: Subject<boolean> = new Subject();
  routes = RoutePage;
  form!: FormGroup;

  passIcon: string = 'visibility_off';
  isLoading: boolean = false;
  mensaje: string | null = null;

  errores: string[] = [];
  constructor(
    private seguridadService: SecurityService,
    private stateManager: StateManagerService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    window.scroll(0, 0);
    this.intiForm();
    this.mensaje = this.route.snapshot.paramMap.get('message');
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
          validators: [Validators.required],
        },
      ],
      recuerdame: false,
    });
  }

  onSubmit() {
    let credenciales: userCredentialsDTO = {
      email: this.form.get('email')!.value,
      password: this.form.get('password')!.value,
      recuerdame: this.form.get('recuerdame')!.value,
    };
    this.isLoading = true;

    this.seguridadService
      .login(credenciales)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (respuesta) => {
          this.seguridadService.guardarToken(respuesta);
          this.setStateManagerVariables();
          this.selectPage(this.routes.Inicio);
          this.isLoading = false;
        },
        error: (errores) => {
          this.manageErrors(errores);
          this.isLoading = false;
        },
      });
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

  setStateManagerVariables() {
    this.stateManager.SetIsAutorizado = this.seguridadService.checkRol('admin');
    this.stateManager.SetIsLogged = true;
    this.stateManager.SetUserLevel = this.getEstadoUser();
  }

  copyToClipboard(texto: string, icon:string) {
    navigator.clipboard.writeText(texto);
    this.showCopyIcon(icon);
  }

  showCopyIcon(inconId:string) {
    let copyIcon = document.getElementById(inconId) as HTMLElement;

    copyIcon.hidden = false;

    setTimeout(function () {
      copyIcon.hidden = true;
    } , 3000);
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
}
