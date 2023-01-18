import { SelectionModel } from '@angular/cdk/collections';
import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  MatPaginator,
  MatPaginatorIntl,
  PageEvent
} from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import {
  manageErrors
} from 'src/app/Core/Helpers';
import {
  SearchValues,
  SortTableDTO,
  traducirPaginator
} from 'src/app/Core/Helpers/TableOptions';
import Swal from 'sweetalert2';
import { RoutePage } from '../../../../../Data/RoutePages';
import { UsuarioDTO } from './Models';
import { UsuariosService } from './Services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit, OnDestroy {
  routes = RoutePage;
  onDestroy$: Subject<boolean> = new Subject();
  usuariosData: UsuarioDTO[] = [];

  message: string = '';
  isErrorMessage: boolean = false;

  //tabla de usuarios
  columnasParaMostrar: string[] = [
    'email',
    'emailConfirmed',
    'phoneNumber',
    'isAdmin',
    'acciones',
  ];
  cantidadTotalDeRegistros: string = '0';
  paginaActual: number = 1;
  recordsPorPagina: number = 10;
  checboxSelection = new SelectionModel<UsuarioDTO>(true, []);
  sort: SortTableDTO = { isAsc: true, byField: 'name' };

  errores: string[] = [];
  datosCargados: boolean = false;
  @ViewChild('paginatorUsers') paginator!: MatPaginator;

  constructor(
    private usuariosService: UsuariosService,
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

  fireAddAdminDialog(id: string): void {
    Swal.fire({
      title: '¿Seguro que quieres otorgar el permiso de admin a este usuario?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#4285F4',
      confirmButtonColor: 'green',
      focusCancel: true,
      icon: 'question',
      confirmButtonText: '<i class="fa fa-trash"></i> Agregar permiso',
    }).then((result) => {
      if (result.isConfirmed) {
        this.hacerAdmin(id);
      }
    });
  }

  hacerAdmin(id: string): void {
    this.usuariosService
      .hacerAdmin(id)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: () => {
          this.mostrarMensajeSuccess('Permiso agregado con éxito!!!');
        },
        error: (errores) => {
          this.message = manageErrors(errores, this.message, this.router);

          this.isErrorMessage = true;
        },
      });
  }

  fireRemoveAdminDialog(id: string): void {
    Swal.fire({
      title: '¿Seguro que quieres remover el permiso de admin a este usuario?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#4285F4',
      confirmButtonColor: 'red',
      focusCancel: true,
      icon: 'error',
      confirmButtonText: '<i class="fa fa-trash"></i> Remover permiso',
    }).then((result) => {
      if (result.isConfirmed) {
        this.removerAdmin(id);
      }
    });
  }

  removerAdmin(id: string): void {
    this.usuariosService
      .removerAdmin(id)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: () => {
          this.mostrarMensajeSuccess('Permiso removido con éxito!!!');
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

    this.usuariosService
      .getUsers(pagina, registrosAMostrar, this.sort)
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
      this.sort.byField = 'email';
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
