import { Injectable } from '@angular/core';
import { User, UserManager } from 'oidc-client';
import { Subject } from 'rxjs';
import { CoreModule } from './core.module';
import { environment } from '../../environments/environment';


@Injectable()
export class AuthService {
  private _user: User;
  private _userManager: UserManager;
  private _loginChangedSubject = new Subject<boolean>();

  loginChanged = this._loginChangedSubject.asObservable();

  constructor() {
    const stsSettings = {
      authority: environment.stsAuthority,
      client_id: environment.clientId,
      redirect_uri: `${environment.clientRoot}signin-callback`,
      scope: 'openid profile homelyAPI',
      response_type: 'code',
      post_logout_redirect_uri: `${environment.clientRoot}signout-callback`,

    };
    console.log(environment.clientRoot);
    this._userManager = new UserManager(stsSettings);

  }

  login() {
    return this._userManager.signinRedirect();
  }

  isLoggedIn(): Promise<boolean> {
    return this._userManager.getUser().then(user => {
      const userCurrent = !!user && !user.expired;
      if (this._user !== user) {
        this._loginChangedSubject.next(userCurrent);
      }
      this._user = user;
      console.log(environment.clientRoot)
      return userCurrent;
    });
  }

  completeLogin() {
    return this._userManager.signinRedirectCallback().then(user => {
      this._user = user;
      this._loginChangedSubject.next(!!user && !user.expired);
      return user;
    });
  }

  logout() {
    this._userManager.signoutRedirect();
  }

  completeLogout() {
    this._user = null;
    return this._userManager.signoutRedirectCallback();
  }

  getAccessToken() {
    return this._userManager.getUser().then(user => {
      if (!!user && !user.expired) {
        return user.access_token;
      }
      else {
        return null;
      }
    })
  }

}

