import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CaseConversionInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            map((event) => {
                if (event instanceof HttpResponse && event.body) {
                    return event.clone({ body: this.snakeToCamel(event.body) });
                }
                return event;
            })
        );
    }

    private snakeToCamel(obj: any): any {
        if (obj instanceof Array) {
            return obj.map((v) => this.snakeToCamel(v));
        } else if (obj !== null && obj?.constructor === Object) {
            return Object.keys(obj).reduce((result, key) => {
                const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
                result[camelKey] = this.snakeToCamel(obj[key]);
                return result;
            }, {} as any);
        }

        return obj;
    }
}
