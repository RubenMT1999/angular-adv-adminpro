import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    nombre: ['ruben', [Validators.required, Validators.minLength(3)]],
    email: ['test@gmail.com', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    password2: ['', [Validators.required, Validators.minLength(3)]],
    terminos: [false, Validators.required],
  }, {
    validators: [this.passwordsIguales('password','password2')]
  });

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService){}


crearUsuario(){
  this.formSubmitted = true;
  console.log(this.registerForm.value);
  console.log(this.registerForm);

  if(this.registerForm.invalid){
    return;
  }

  this.usuarioService.crearUsuario(this.registerForm.value)
    .subscribe(
      {
        next: resp => {console.log(resp);},
        error: (err) =>{Swal.fire('Error', err.error.msg, 'error')}
      }
    )
}


//VALIDACIONES DE FORMULARIO
campoNoValido(campo: string): boolean {
  if(this.registerForm.get(campo)?.invalid && this.formSubmitted){
    return true;
  }else{
    return false;
  }
}

aceptaTerminos(){
  return !this.registerForm.get('terminos')?.value && this.formSubmitted;
}


contrasenasNoValidas(){
  const pass1 = this.registerForm.get('password')?.value;
  const pass2 = this.registerForm.get('password2')?.value;

  if((pass1 === pass2) && this.formSubmitted){
    return false;
  }else{
    return true;
  }

}

//necesito esta validación para que no se envie el formulario cuando sean
//passwords distintas
passwordsIguales(pass1Name: string, pass2Name: string){
  return (formGroup: FormGroup) => {
    const pass1Control = formGroup.get(pass1Name);
    const pass2Control = formGroup.get(pass2Name);

    if(pass1Control?.value === pass2Control?.value){
      pass2Control?.setErrors(null)
    }else{
      pass2Control?.setErrors({noEsIgual: true})
    }
  }
}


}
