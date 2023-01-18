import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { RoutePage } from 'src/app/Core/Data';
import { GetErrorRedirectPage, parsearErroresAPI } from 'src/app/Core/Helpers';
import { CategoriaDTO } from '../../Models/Categoria.model';
import { CategoriasService } from '../../Services';

@Component({
  selector: 'app-create-categoria',
  templateUrl: './create-categoria.component.html',
  styleUrls: ['./create-categoria.component.scss'],
})
export class CreateCategoriaComponent implements OnInit, OnDestroy {
  routes = RoutePage;

  onDestroy$: Subject<boolean> = new Subject();
  form!: FormGroup;

  message: string = '';
  isErrorMessage: boolean = false;
  isLoading: boolean = false;
  errores: string[] = [];

  constructor(
    private categoriaService: CategoriasService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.intiForm();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  intiForm() {
    this.form = this.formBuilder.group({
      nombre: [
        '',
        {
          validators: [Validators.required, Validators.maxLength(100)],
        },
      ],
    });
  }

  onSubmit() {
    let categoria: CategoriaDTO = {
      id: 0,
      nombre: this.form.get('nombre')!.value,
    };

    this.isLoading = true;

    this.categoriaService
      .agregarCategoria(categoria)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: () => {
          const urlReturn = `/${RoutePage.Administracion}/${RoutePage.Categorias}/Categoría agregada con éxito!!!/true`;

          this.router.navigate([urlReturn]);
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
      this.router.navigate([GetErrorRedirectPage(error)]);
    }
  }

  obtenerMensajeErrorNombre() {
    var campo = this.form!.get('nombre');

    if (campo!.hasError('required')) {
      return 'El Nombre es requerido';
    }

    if (campo!.hasError('maxlength')) {
      return 'El nombre debe tener menos de 100 caracteres.';
    }

    return '';
  }
}
