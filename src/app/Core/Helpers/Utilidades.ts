import { Router } from '@angular/router';
import { RoutePage } from '../Data';
import { ErrorCode } from '../Data/ErrorCodes';

export function parsearErroresAPI(response: any): string[] | ErrorCode {
  const resultado: string[] = [];

  switch (response.status) {
    case ErrorCode.BadRequest:
      resultado.push(...mapErrors(response.error));
      break;
    case ErrorCode.Unauthorized:
      return ErrorCode.Unauthorized;

    case ErrorCode.Forbiden:
      return ErrorCode.Unauthorized;

    case ErrorCode.NotFound:
      return ErrorCode.NotFound;

    case ErrorCode.MethodNotAllowed:
      return ErrorCode.MethodNotAllowed;

    case ErrorCode.InternalServerError:
      return ErrorCode.InternalServerError;

    case ErrorCode.ServiceUnavailable:
      return ErrorCode.ServiceUnavailable;

    default:
      return ErrorCode.InternalServerError;
  }

  return resultado;
}

function mapErrors(error: any): string[] {
  const output: string[] = [];

  //si el error es uno solo su tipo es string, si son varios es object
  if (typeof error === 'string') {
    output.push(error);
  } else {
    if (error.errors != undefined) {
      const entradas = Object.entries(error.errors); //esto transforma nuestro objeto en un arreglo

      //ahora iteraremos ese arreglo
      entradas.forEach((arreglo: any[]) => {
        const campo = arreglo[0]; //obtenemos el campo que nos dio el error

        //iteramos el arreglo para obtener los errores y los pasamos al resultado junto con el nombre del campo
        arreglo[1].forEach((mensajeError: string) => {
          //resultado.push(`${campo}: ${mensajeError}`);
          output.push(`${mensajeError}`);
        });
      });
    } else {
      output.push('Ocurrió un error desconocido.');
    }
  }
  return output;
}

export function manageErrors(errores: any, message: string, router: Router): string {
  const error: number | string[] = parsearErroresAPI(errores);

  if (typeof error !== 'number') {
    return error.toString();
  } else {
    router.navigate([GetErrorRedirectPage(error)]);
  }
  return '';
}

export function GetErrorRedirectPage(codigo: ErrorCode): RoutePage {
  switch (codigo) {
    case ErrorCode.Unauthorized:
      return RoutePage.Unauthorized;

    case ErrorCode.Forbiden:
      return RoutePage.Unauthorized;

    case ErrorCode.NotFound:
      return RoutePage.NotFound;

    case ErrorCode.MethodNotAllowed:
      return RoutePage.NotFound;

    default:
      return RoutePage.ServerError;
  }
}

export enum UtcToLocalDateTimeFormat {
  FULL = 'full',
  SHORT = 'short',
  SHORT_DATE = 'shortDate',
  SHORT_TIME = 'shortTime',
}

export function ConvertUtcToLocalDate(
  utcDate: string,
  format: UtcToLocalDateTimeFormat | string
): string {
  var browserLanguage = navigator.language;

  if (format === UtcToLocalDateTimeFormat.SHORT) {
    let date = new Date(utcDate).toLocaleDateString(browserLanguage);
    let time = new Date(utcDate).toLocaleTimeString(browserLanguage);

    return `${date}, ${time}`;
  } else if (format === UtcToLocalDateTimeFormat.SHORT_DATE) {
    return new Date(utcDate).toLocaleDateString(browserLanguage);
  } else if (format === UtcToLocalDateTimeFormat.SHORT_TIME) {
    return new Date(utcDate).toLocaleTimeString(browserLanguage);
  } else if (format === UtcToLocalDateTimeFormat.FULL) {
    return new Date(utcDate).toString();
  } else {
    console.error(
      `No se encontro el formato utc: [] ${format} ] de la fecha, `
    );
    return new Date(utcDate).toString();
  }
}
