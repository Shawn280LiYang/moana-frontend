import { Injectable, OnInit } from "@angular/core";
import { Http,Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { User } from "../shared/user";

@Injectable()
export class UserpanelService {
<<<<<<< HEAD
    private url = 'http://dev5.sprintechco.com/java/taotao/userPanel';
=======
    private url = 'http://dev5.sprintechco.com/java/cat/userPanel';
>>>>>>> 78a9ca498c53f1f362cb595bb7746d898ab11a90
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