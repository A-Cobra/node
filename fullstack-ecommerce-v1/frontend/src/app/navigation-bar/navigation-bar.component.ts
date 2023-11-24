import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  styleUrls: ['./navigation-bar.component.scss'],
  template: `
    <nav>
      <ul>
        <li>
          <a
            routerLinkActive="active"
            [routerLink]="['/products']"
            [routerLinkActiveOptions]="{ exact: true }"
            >Products</a
          >
          <a routerLinkActive="active" [routerLink]="['/products', 'create']"
            >Create Product</a
          >
        </li>
      </ul>
    </nav>
  `,
})
export class NavigationBarComponent {
  constructor(private router: Router) {}
}
