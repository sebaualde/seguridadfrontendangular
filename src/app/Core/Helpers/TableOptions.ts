import { MatPaginatorIntl } from "@angular/material/paginator";

export interface SortTableDTO{
  isAsc: boolean;
  byField: string;
}

export interface SearchValues{
  pagina: number;
  recordsPorPagina: number;
  isAsc: boolean;
}

/**
 * Traduce los textos de la paginacion de tablas.
 * @param paginator Parametro del paginator que se quiere modificar
 */
export function traducirPaginator(paginator: MatPaginatorIntl){
    paginator.itemsPerPageLabel = "Registros por página";
    paginator.firstPageLabel = "Página inicial";
    paginator.lastPageLabel = "Última página";
    paginator.nextPageLabel = "Siguiente";
    paginator.previousPageLabel = "Anterior";
}

/**
 * Compara valores para el ordenamiento de tablas.
 * @param a Primer parametro, puede ser number o string
 * @param b Segundo parametro, puede ser number o string
 * @param isAsc Parametro que determina si el ordenamiento es ascendente o descendente (boolean)
 */
export function compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {

  let result: number | string ;

  if(typeof a === 'string' && a !== null && typeof b === 'string' && b !== null){
    result = (a.toLowerCase() < b.toLowerCase() ? -1 : 1) * (isAsc ? 1 : -1);
  }else if(typeof a === 'number' && a !== null && typeof b === 'number' && b !== null){
    result = (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }else{
    result = (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }


  return result;
}
