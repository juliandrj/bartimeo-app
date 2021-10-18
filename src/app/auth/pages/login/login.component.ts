import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Credenciales } from '../../interfaces/login.interfaces';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

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

  public mostrarModal: boolean = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      if (this.loginService.usuario.pk > 0){
        this.router.navigate(['/main/']);
      } else if (this.loginService.esUsuarioDummy) {
        this.loginService.obtenerUsuario().subscribe(
          usuario => {
            if (usuario.pk !== this.loginService.usuarioDummy.pk) {
              this.router.navigate(['/main/']);
            }
          }
        );
      }
    }
  }

  public validar(): void {
    if (this.loginForm.invalid) {
      return;
    }
    const credenciales: Credenciales = {
      username: this.loginForm.get('usuario')?.value,
      password: this.loginForm.get('contrasenia')?.value
    };
    this.loginService.login(credenciales).subscribe(
      respuesta => {
        if (respuesta) {
          this.router.navigate(['/main/']);
        } else {
          this.loginForm.reset({
            usuario: '',
            contrasenia: ''
          });
          this.mostrarModal = true;
        }
      }
    );
  }

}
