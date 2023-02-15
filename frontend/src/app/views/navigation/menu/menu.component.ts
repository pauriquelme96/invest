import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Input() ctrl: any;

  public open: boolean;

  public sections = [
    {
      path: '',
      iconName: 'home',
      name: 'Inicio',
    },
    {
      path: 'notifications',
      iconName: 'bell',
      name: 'Notificaciones',
    },
    {
      path: 'balance',
      iconName: 'credit-card',
      name: 'Balance',
    },
    {
      path: 'profile',
      iconName: 'user',
      name: 'Perfil',
    },
    {
      path: '*',
      iconName: 'settings',
      name: 'Ajustes',
    },
    {
      path: '*',
      iconName: 'interrogation',
      name: 'Ayuda',
    },
    {
      path: 'exit',
      iconName: 'sign-out',
      name: 'Cerrar sesión',
    },
  ];

  constructor(
    private loginService: LoginService,
    private router: Router,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.open = true;
    });
  }

  public navigateTo(path: string) {
    if (path === '*') return;

    this.closeMenu();

    if (path === 'exit') {
      this.loginService.destroyUser();
      this.router.navigate(['login']);
    } else {
      this.router.navigate(['home', path]);
    }
  }

  public closeMenu() {
    this.open = false;
    this.modalService.closeModal();
  }
}
