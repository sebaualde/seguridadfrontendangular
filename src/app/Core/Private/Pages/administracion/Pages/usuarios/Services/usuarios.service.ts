import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SortTableDTO } from 'src/app/Core/Helpers/TableOptions';
import { environment } from 'src/environments/environment';
import { UsuarioDTO } from '../Models';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  apiURL = environment.apiUrl + 'account';

  constructor(private httpClient: HttpClient) { }

  public getUsers(pagina:number, registrosPorPagina: number, sort: SortTableDTO): Observable<any>{
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append('recordsPorPagina', registrosPorPagina.toString());
    params = params.append('isOrderAsc', sort.isAsc);
    params = params.append('colName', sort.byField);

    return this.httpClient.get<UsuarioDTO[]>(this.apiURL+'/listadoUsuarios', {observe: 'response', params});
  }

  public hacerAdmin(userId: string): Observable<any> {
    const url = new URL(`${this.apiURL}/hacerAdmin`);
    url.searchParams.set('usuarioId', userId);

    return this.httpClient.post(url.toString(), '');
  }

  public removerAdmin(userId: string): Observable<any> {
    const url = new URL(`${this.apiURL}/removerAdmin`);
    url.searchParams.set('usuarioId', userId);

    return this.httpClient.post(url.toString(), '');
  }


}
