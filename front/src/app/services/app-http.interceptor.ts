import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, finalize, Observable, throwError} from 'rxjs';
import {AuthService} from "./auth.service";
import {Route, Router} from "@angular/router";

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(private authService : AuthService, private router : Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //console.log("================interceptor ok");
    let newReq=request.clone({
      headers : request.headers.set('Authorization',this.authService.token?'Bearer '+this.authService.token:'')
    });
    return next.handle(newReq).pipe(
      catchError((err) => {
        if(err.status==403){
          this.router.navigateByUrl("/admin/notAuthorized");
        } else if(err.status==401){
          this.router.navigateByUrl("/login")
        }
        return throwError(err);
      }),
      finalize(()=>{

      })
    );
  }

  private handleError(err:HttpErrorResponse){

  }
}


