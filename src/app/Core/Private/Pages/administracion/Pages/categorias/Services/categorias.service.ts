import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SortTableDTO } from 'src/app/Core/Helpers/TableOptions';
import { environment } from 'src/environments/environment';
import { CategoriaDTO } from '../Models/Categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  apiURL = environment.apiUrl + 'categorias';

  constructor(private httpClient: HttpClient) { }

  public getCategorias(pagina:number, registrosPorPagina: number, sort: SortTableDTO): Observable<any>{
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append('recordsPorPagina', registrosPorPagina.toString());
    params = params.append('isOrderAsc', sort.isAsc);
    params = params.append('colName', sort.byField);

    return this.httpClient.get<CategoriaDTO[]>(this.apiURL+'/getCategorias', {observe: 'response', params});
  }

  public getCategoria(id: number): Observable<any>{
    const url = new URL(`${this.apiURL}`);
    url.searchParams.set('id', String(id));

    return this.httpClient.get<CategoriaDTO>(url.toString());
  }

  public agregarCategoria(categoria: CategoriaDTO): Observable<any>{
    return this.httpClient.post(this.apiURL, categoria);
  }

  public editarCategoria(categoria: CategoriaDTO): Observable<any>{
    return this.httpClient.put(this.apiURL, categoria);
  }

  public eliminarCategoria(id: number): Observable<any> {
    const url = new URL(`${this.apiURL}`);
    url.searchParams.set('id', String(id));

    return this.httpClient.delete(url.toString());
  }

}
