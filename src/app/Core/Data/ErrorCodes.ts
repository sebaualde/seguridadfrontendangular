export enum ErrorCode{
  BadRequest = 400,
  Unauthorized = 401,
  Forbiden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,

  //servidor
  InternalServerError = 500,
  ServiceUnavailable = 503,
  UnknownError = 0
}
