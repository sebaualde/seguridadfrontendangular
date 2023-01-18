import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  MatPaginator,
  MatPaginatorIntl,
  PageEvent,
} from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { RoutePage } from 'src/app/Core/Data';
import { manageErrors } from 'src/app/Core/Helpers';
import {
  SearchValues,
  SortTableDTO,
  traducirPaginator,
} from 'src/app/Core/Helpers/TableOptions';
import Swal from 'sweetalert2';
import { UsuarioDTO } from '../../../usuarios';
import { CategoriasService } from '../../Services';

@Component({
  selector: 'app-list-categorias',
  templateUrl: './list-categorias.component.html',
  styleUrls: ['./list-categorias.component.scss'],
})
export class ListCategoriasComponent implements OnInit, OnDestroy {
  routes = RoutePage;
  onDestroy$: Subject<boolean> = new Subject();
  usuariosData: UsuarioDTO[] = [];

  message: string = '';
  isErrorMessage: boolean = false;

  //tabla de usuarios
  columnasParaMostrar: string[] = ['nombre', 'acciones'];
  columnasParaNoAdmin: string[] = ['nombre'];
  cantidadTotalDeRegistros: string = '0';
  paginaActual: number = 1;
  recordsPorPagina: number = 10;
  checboxSelection = new SelectionModel<UsuarioDTO>(true, []);
  sort: SortTableDTO = { isAsc: true, byField: 'name' };

  errores: string[] = [];
  datosCargados: boolean = false;
  @ViewChild('paginatorCategoria') paginator!: MatPaginator;

  constructor(
    private categoriasService: CategoriasService,
    private paginatorIntl: MatPaginatorIntl,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    traducirPaginator(this.paginatorIntl);
    this.cargarLista(this.paginaActual, this.recordsPorPagina);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  //====METODOS=====

  eliminarDialog(id: number, nombre: string): void {
    Swal.fire({
      title: `¿Seguro que quieres eliminar la categoria: "${nombre}"?`,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#4285F4',
      confirmButtonColor: 'red',
      focusCancel: true,
      icon: 'error',
      confirmButtonText: '<i class="fa fa-trash"></i> Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminarCategoria(id);
      }
    });
  }

  eliminarCategoria(id: number): void {
    this.categoriasService
      .eliminarCategoria(id)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: () => {
          this.mostrarMensajeSuccess('Categoría eliminada con éxito!!!');
        },
        error: (errores) => {
          this.message = manageErrors(errores, this.message, this.router);
          this.isErrorMessage = true;
        },
      });
  }

  actualizarPaginacion(datos: PageEvent) {
    this.paginaActual = datos.pageIndex + 1;
    this.recordsPorPagina = datos.pageSize;
    this.checboxSelection.clear();
    this.cargarLista(this.paginaActual, this.recordsPorPagina);
  }

  cargarLista(pagina: number, registrosAMostrar: number) {
    this.message = this.activatedRoute.snapshot.paramMap.get('message') ?? '';
    this.isErrorMessage =
      this.activatedRoute.snapshot.paramMap.get('isError') == 'true';

    this.categoriasService
      .getCategorias(pagina, registrosAMostrar, this.sort)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (response) => {
          this.usuariosData = response.body;
          this.cantidadTotalDeRegistros = response.headers.get(
            'cantidadTotalRegistros'
          );
          this.datosCargados = true;
        },
        error: (errores) => {
          this.message = manageErrors(errores, this.message, this.router);
          this.isErrorMessage = true;
        },
        complete: () => {
          window.scroll(0, 0);
        },
      });
  }

  mostrarMensajeSuccess(mensaje: string) {
    this.checboxSelection.clear();
    this.cargarLista(this.paginaActual, this.recordsPorPagina);
    this.message = mensaje;
  }

  //ORDENAMIENTO DE DATOS
  ordenarData(sort: Sort) {
    //por defecto
    if (!sort.active || sort.direction === '') {
      this.sort.isAsc = true;
      this.sort.byField = 'nombre';
    } else {
      this.sort.isAsc = sort.direction !== 'asc';
      this.sort.byField = sort.active;
    }

    this.cargarLista(this.paginaActual, this.recordsPorPagina);
    this.paginator.firstPage();
  }

  getSearchValues(): SearchValues {
    let output: SearchValues = {
      pagina: this.paginaActual,
      recordsPorPagina: this.recordsPorPagina,
      isAsc: this.sort.isAsc,
    };

    return output;
  }
}
