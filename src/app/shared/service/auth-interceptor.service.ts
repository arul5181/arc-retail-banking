import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { tap } from "rxjs/operators";

export class AuthInterceptorService implements HttpInterceptor{
intercept(request:HttpRequest<any>,handler:HttpHandler){
    console.log('Request is started');
    return handler.handle(request)
    .pipe(tap(event=>{
     if(event.type === HttpEventType.Response)   {
         console.log('Request is processed');
     }
    })
    );
}
}