import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export const httpCustomInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const token = localStorage.getItem("bearerToken");
  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  })
 
  return next(clonedRequest).pipe(
    tap({
      next: event => {
        if (event instanceof HttpResponse) {
          // Handle the response here
          // console.log('Response Interceptor:', event);
          // You can modify the response here if needed, e.g.:
          // event = event.clone({ body: modifiedBody });
        }
      },
      error: error => {
        // Handle the error response here if needed
        if (error.status === 401) {
          console.log('Unauthorised');
          localStorage.removeItem("bearerToken");
          localStorage.removeItem("fullName");
          console.log("Unauthorised, Please login again");
          // toastrService.error('Unauthorised, Please login again');
        }
        console.error('Error intercepted:', error);
      }
    })
  );
};
