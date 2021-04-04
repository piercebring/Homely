import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { from, Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { AuthService } from "./auth-service.component";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private _authService: AuthService, private _router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.startsWith(environment.apiRoot)) {
      console.log(req.url);
      return from(
        this._authService.getAccessToken().then((token) => {
          const headers = new HttpHeaders().set(
            "Authorization",
            `Bearer ${token}`
          );
          const authReq = req.clone({ headers });

          return next
            .handle(authReq)
            .pipe(
              tap(
                (_) => {},
                (error) => {
                  var respError = error as HttpErrorResponse;
                  if (
                    respError &&
                    (respError.status === 401 || respError.status === 403)
                  ) {
                    this._router.navigate(["/unauthorized"]);
                  }
                }
              )
            )
            .toPromise();
        })
      );
    } else {
      return next.handle(req);
    }
  }
}
