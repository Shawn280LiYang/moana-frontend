import { Injectable } from "@angular/core";
import { Http,Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { Movie } from "../shared/movie";

@Injectable()
export class MovieService {
    private movieUrl = window.location.origin + '/java/cat/movieAll';
    private ticketStockUrl = window.location.origin + '/java/cat/ticketStockAll';

    constructor (private http: Http){}

    getMovies(): Observable<Movie[]>{
        return this.http.get(this.movieUrl)
                        .map(this.extractData)
                        .catch(this.handleError);
    }

    getTicketStock(): Observable<any[]>{
        return this.http.get(this.ticketStockUrl)
                        .map(this.extractData)
                        .catch(this.handleError);
    }

    private extractData(res: Response){
        let body = res.json();
        return body.data || [];
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