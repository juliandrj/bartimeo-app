import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../interfaces/login.interfaces';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup = this.fb.group({
    usuario: ['', [Validators.required]],
    contrasenia: ['', [Validators.required]]
  });

  constructor( private fb: FormBuilder,
               private loginService: LoginService ) { }

  ngOnInit(): void { }

  public validar(): void {
    if (this.loginForm.invalid) {
      return;
    }
    const usuario: Usuario = {
      username: this.loginForm.get('usuario')?.value,
      password: this.loginForm.get('contrasenia')?.value
    };
    this.loginService.login(usuario).subscribe(
      respuesta => {
        console.log(respuesta);
      }
    );
  }

}
