import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/auth/interfaces/login.interfaces';
import { LoginService } from 'src/app/auth/services/login.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public items: MenuItem[] = [];

  public get usuario(): Usuario {
    return this.loginService.usuario;
  }

  constructor(
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.items = this.loginService.menu;
  }

  public salir(): void {
    this.loginService.logout();
  }

}
