import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import {
  GetErrorRedirectPage,
  manageErrors,
  parsearErroresAPI,
} from 'src/app/Core/Helpers';
import { CategoriaDTO } from '../../Models/Categoria.model';
import { CategoriasService } from '../../Services/categorias.service';

@Component({
  selector: 'app-edit-categoria',
  templateUrl: './edit-categoria.component.html',
  styleUrls: ['./edit-categoria.component.scss'],
})
export class EditCategoriaComponent implements OnInit, OnDestroy {
  categoriaModel: CategoriaDTO = { id: 0, nombre: '' };

  onDestroy$: Subject<boolean> = new Subject();
  form!: FormGroup;

  message: string = '';
  isErrorMessage: boolean = false;
  isLoading: boolean = false;
  errores: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private categoriaService: CategoriasService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCategoria();
    this.intiForm();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  getCategoria() {
    let categoriaId: number = Number(
      this.activatedRoute.snapshot.paramMap.get('id')
    );

    this.categoriaService
      .getCategoria(categoriaId)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (response: CategoriaDTO) => {
          this.categoriaModel = response;
          this.form.patchValue(this.categoriaModel);
        },
        error: (errores) => {
          this.message = manageErrors(errores, this.message, this.router);
          this.isErrorMessage = true;
        },
      });
  }

  intiForm() {
    this.form = this.formBuilder.group({
      id: '',
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
      id: this.categoriaModel!.id,
      nombre: this.form.get('nombre')!.value,
    };

    this.isLoading = true;

    this.categoriaService
      .editarCategoria(categoria)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: () => {
          this.message = 'Categoría modificada con éxito!!!';
          this.categoriaModel.nombre = categoria.nombre;
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
