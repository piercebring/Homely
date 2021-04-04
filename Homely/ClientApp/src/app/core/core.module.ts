import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthService } from "./auth-service.component";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptorService } from "./auth-interceptor.service";

@NgModule({
  declarations: [],
  imports: [],
  exports: [],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
})
export class CoreModule {}
