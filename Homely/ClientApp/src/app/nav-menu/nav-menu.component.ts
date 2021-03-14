import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../core/auth-service.component';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isLoggedIn = false;

  constructor(private _authService: AuthService) {

     this._authService.loginChanged.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });
  }

  isExpanded = false;
 
  ngOnInit() {
    this._authService.isLoggedIn().then(loggedIn => {
      this.isLoggedIn = loggedIn;
    });   

  }

  login() {
    this._authService.login();
  }

  logout() {
    this._authService.logout();
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
