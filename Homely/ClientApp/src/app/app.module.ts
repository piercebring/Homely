import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { HomeComponent } from "./home/home.component";
import { CounterComponent } from "./counter/counter.component";
import { FetchDataComponent } from "./fetch-data/fetch-data.component";
import { AuthService } from "../app/core/auth-service.component";
import { CoreModule } from "./core/core.module";
import { SigninRedirectCallbackComponent } from "./signin-redirect-callback/signin-redirect-callback.component";
import { SignoutRedirectCallbackComponent } from "./signout-redirect-callback/signout-redirect-callback.component";
import { AuthInterceptorService } from "./core/auth-interceptor.service";
import { UnauthorizedComponent } from "./unauthorized/unauthorized.component";

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    SigninRedirectCallbackComponent,
    SignoutRedirectCallbackComponent,
    UnauthorizedComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: "", component: HomeComponent, pathMatch: "full" },
      { path: "counter", component: CounterComponent },
      { path: "fetch-data", component: FetchDataComponent },
      { path: "signin-callback", component: SigninRedirectCallbackComponent },
      { path: "signout-callback", component: SignoutRedirectCallbackComponent },
      { path: "unauthorized", component: UnauthorizedComponent },
    ]),
    CoreModule,
    BrowserAnimationsModule

  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
