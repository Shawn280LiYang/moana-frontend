import { Injectable } from "@angular/core";
import { Http,Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { Movie } from "../shared/movie";

@Injectable()
export class MovieService {
<<<<<<< HEAD
    private movieUrl = 'http://dev5.sprintechco.com/java/taotao/movieAll';
    private ticketStockUrl = 'http://dev5.sprintechco.com/java/taotao/ticketStockAll';
=======
    private movieUrl = 'http://dev5.sprintechco.com/java/cat/movieAll';
    private ticketStockUrl = 'http://dev5.sprintechco.com/java/cat/ticketStockAll';
>>>>>>> 78a9ca498c53f1f362cb595bb7746d898ab11a90

    constructor (private http: Http){}

    getMovies(): Observable<Movie[]>{
        return this.http.get(this.movieUrl)
                        .map(this.extractData)
                        .catch(this.handleError);
    }

    getTicketStock(): Observable<any>{
        return this.http.get(this.movieUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response){
        let body = res.json();
        console.log('service res body');
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