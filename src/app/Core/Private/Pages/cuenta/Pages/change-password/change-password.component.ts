import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { RoutePage } from 'src/app/Core/Data';
import { GetErrorRedirectPage, parsearErroresAPI } from 'src/app/Core/Helpers';
import { PasswordMatch } from 'src/app/Core/Public/Pages/registro/Validators/PasswordMatch';
import { changePasswordDTO, SecurityService } from 'src/app/Security';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  onDestroy$: Subject<boolean> = new Subject();

  routes = RoutePage;

  form!: FormGroup;

  isLoading: boolean = false;
  passActualIcon: string = 'visibility_off';
  passIcon: string = 'visibility_off';
  confirmIcon: string = 'visibility_off';

  errores: string[] = [];
  constructor(
    private seguridadService: SecurityService,
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
      passwordActual: [
        undefined,
        {
          validators: [Validators.required, Validators.minLength(6)],
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

  openDialog(){

    Swal.fire({
      title: '¿Seguro que quieres modificar tu password?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#4285F4',
      confirmButtonColor: 'red',
      focusCancel: true,
      icon: 'error',
      confirmButtonText: '<i class="fa fa-trash"></i> Modificar'
    }).then((result) => {

      if (result.isConfirmed) {
        this.onSubmit();
      }
    });

  }

  onSubmit() {
    let credenciales: changePasswordDTO = {
      oldPassword: this.form.get('passwordActual')!.value,
      newPassword: this.form.get('password')!.value,
      confirm: this.form.get('confirm')!.value,
    };

    this.isLoading = true;

    this.seguridadService
      .changePassword(credenciales)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: () => {
          this.selectPage(this.routes.Login+'/"Password modificado con éxito!!!"');
          this.seguridadService.logout();
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
    this.router.navigate(['/'+page]);
  }

  showPassActual() {
    let input = document.getElementById('passActual') as HTMLInputElement;

    if (this.passActualIcon === 'visibility') {
      input.type = 'password';
      this.passActualIcon = 'visibility_off';
    } else {
      input.type = 'text';
      this.passActualIcon = 'visibility';
    }
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

  obtenerMensajeErrorPasswordActual() {
    var campo = this.form!.get('passwordActual');

    if (campo!.hasError('required')) {
      return 'El campo Password Actual es requerido';
    }

    if (campo!.hasError('minlength')) {
      return 'El password debe tener 6 caracteres como minimo.';
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
