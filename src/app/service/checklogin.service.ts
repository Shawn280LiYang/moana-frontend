import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Rx";

@Injectable()
export class CheckLoginService{
<<<<<<< HEAD
    private checkloginUrl = window.location.origin + '/java/taotao/checkLogin';
=======
    private checkloginUrl = window.location.origin + '/java/cat/checkLogin';
>>>>>>> 78a9ca498c53f1f362cb595bb7746d898ab11a90

    constructor(private http: Http){}

    checkLogin(): Observable<any>{
        let _url = this.checkloginUrl;
        return this.http.get(_url)
                   .map(this.extractData)
                   .catch(this.handleError);
    }

    private extractData(res: Response){
        let body = res.json()
        return body['responseCode'] || {};
    }

    private handleError (error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}