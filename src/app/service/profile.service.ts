import { Injectable, OnInit } from "@angular/core";
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import { Observable } from "rxjs/Rx";

@Injectable()
export class ProfileService {
    private url = window.location.origin + '/java/cat/update';
    private getUrl = window.location.origin + '/java/cat/userInfo';

    constructor (private http: Http){}

    updateProfile (profile: string): Observable<any> {
        let _url = this.url + '?' + profile;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(_url,profile,options)
                        .map(this.extractData)
                        .catch(this.handleError);
    }

    getProfile(): Observable<any>{
        return this.http.get(this.getUrl)
                        .map(this.extractUser)
                        .catch(this.handleError);
    }

    private extractUser(res: Response){
        let body = res.json();
        if(body['responseCode'] == 0) return body['data'];
        else return false;
    }

    private extractData(res: Response){
        let body = res.json();

        return body['responseCode'];
    }

    private handleError (error: Response | any) {
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