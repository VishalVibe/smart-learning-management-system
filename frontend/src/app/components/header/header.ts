import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  showProfileMenu = false;

toggleProfileMenu() {
  this.showProfileMenu = !this.showProfileMenu;
}
}
