import { Injectable, OnInit } from "@angular/core";
import { Http,Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { User } from "../shared/user";

@Injectable()
export class UserpanelService {
    private url = window.location.origin + '/java/cat/userPanel';
    private data: any;

    constructor (private http: Http){}

    getUserData():Observable<User>{
        return this.http.get(this.url)
                        .map(this.extractData)
                        .catch(this.handleError);
    }
    
    private extractData(res: Response){
        let body = res.json();

        return body || {};
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