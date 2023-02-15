import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  public currentPath: string;
  public routes = [
    {
      path: '',
      iconName: 'home',
    },
    {
      path: 'notifications',
      iconName: 'bell',
    },
    {
      path: 'balance',
      iconName: 'credit-card',
    },
    {
      path: 'support',
      iconName: 'comments',
    },
    {
      path: 'profile',
      iconName: 'user',
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.currentPath = location.hash.split('/')[2] || '';
    this.router.events.subscribe(() => {
      this.currentPath = this.router.url.split('/')[2] || '';
    });
  }

  public navigateTo(route: string): void {
    this.router.navigate(['home', route]);
  }
}
