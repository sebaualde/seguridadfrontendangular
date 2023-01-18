export enum RoutePage{
  Inicio            = "visitante",
  Login             = "login",
  Registro          = "registro",
  RecuperarPassword = "recuperarPassword",
  ResetPassword     = "resetPassword",
  RegisterMessage   = "registerMessage",
  CuentaConfirmada   = "cuentaConfirmada",

  //autenticado
  Cuenta          = "cuenta",
  CuentaCategorias  = "cuenta/cuentaCategorias",
  CambiarPassword   = "cuenta/cambiarPassword",

  //autorizado
  Administracion    = "administracion",
  Categorias        = "categorias",
  CreateCategoriaFullPath = "/administracion/categorias/createCategoria",
  CreateCategoria   = "createCategoria",
  EditCategoriaFullPath = "/administracion/categorias/editCategoria",
  EditCategoria     = "editCategoria",
  Usuarios          = "usuarios",

  //errores
  Unauthorized      = "unauthorized",
  NotFound          = "notfound",
  ServerError       = "serverError",
  ErrorTests      = "errorTests",

}
