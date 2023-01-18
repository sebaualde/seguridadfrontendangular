import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

export function PasswordMatch(form: FormGroup): ValidatorFn{
  return (control: AbstractControl) => {
    const valor = <string>control.value;

    if(!valor){ return null;}

    if(valor.length === 0){ return null; }

    const password = form.get("password")!.value;
    const confirm = form.get("confirm")!.value;

    if(password !== confirm){
      return {
        passwordMatch: {
          mensaje: 'El password y la confirmación no coinciden.'
        }
      };
    }

    return null;
  }
}
