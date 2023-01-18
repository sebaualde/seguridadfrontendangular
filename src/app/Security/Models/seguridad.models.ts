export interface userCredentialsDTO{
  email: string;
  password: string;
  recuerdame: boolean;
}

export interface registerCredentialsDTO{
  email: string;
  password: string;
  confirm: string;
}

export interface userResetPassDTO extends registerCredentialsDTO {
  token: string;
}

export interface changePasswordDTO{
  oldPassword: string;
  newPassword: string;
  confirm: string;
}

export interface authenticationResponseDTO{
  token: string;
  expiration: Date;
  isSuccess: boolean;
  message: string;
}

export interface UserDTO {
  id: string;
  email: string;
}
