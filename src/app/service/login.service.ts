import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Rx";

@Injectable()
export class LoginService{

    private loginUrl = window.location.origin + '/java/cat/userLogin';
    private ticketUrl = window.location.origin + '/java/cat/getLoginTicket';
    private thirdPartyLoginUrl = window.location.origin + '/java/cat/getAppid';

    constructor(private http: Http){}
    
    loginUser(userInfo:any): Observable<any>{
        let _url = this.loginUrl + "?"+ userInfo;
        console.log(_url);
        return this.http.get(_url)
                        .map(this.extractLoginRtCode)
                        .catch(this.handleError);
    }

    getLoginTicket(username):Observable<any>{
        let _url = this.ticketUrl + "?" + username;
        return this.http.get(_url)
                        .map(this.getTicket)
                        .catch(this.handleError);
    }

    getAppid(thirdParty){
        let _url = this.thirdPartyLoginUrl + thirdParty;

        return this.http.get(_url)
                   .map(this.extractAppid)
                   .catch(this.handleError);
    }

    private extractAppid(res: Response){
        let body = res.json();
        return body['appid'] || {};
    }

    private getTicket(res: Response){
        let body = res.json();
        if (body.responseCode == 0) return parseInt(body.data.timestamp);
        else return 10001;
    }

    private extractLoginRtCode(res: Response){
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