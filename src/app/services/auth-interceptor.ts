import { HttpEvent, HttpHandlerFn, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError, Observable } from 'rxjs';
import { inject } from '@angular/core';

// AuthInterceptor als Funktion
export const authInterceptor = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  console.log('Interceptor active'); // Debug-Log

  if (token) {
    console.log('Token found', token); // Debug-Log
    req = req.clone({
      setHeaders: { Authorization: `Token ${token}` }
    });
  } else {
    console.log('No token found'); // Debug-Log
  }

  return next(req).pipe(
    catchError((err) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          router.navigateByUrl('/login');
        }
      }
      return throwError(() => err);
    })
  );
};
