import { Component, OnInit, OnDestroy } from '@angular/core';
import { Movie } from '../../shared/movie';
import { MovieService } from '../../service/movie.service';
import {CheckLoginService} from "../../service/checklogin.service";
import {Router} from "@angular/router";

@Component({
    selector: "my-movielist",
    template:`
            <div class="wrapper-content" *ngFor="let movie of movies; let i=index;">
                <div class="mov-img-box">
                    <img class="mov-img" src="{{movie.imgurl}}">
                </div>
                <div class="mov-description-box">
                    <p class="mov-title">{{movie.name}}</p>
                    <p class="mov-time">{{movie.showtime}}</p>
                    <p class="mov-short-des">{{movie.briefintro}}</p>
                    <span class="mov-cat" *ngFor="let tag of movie.tags">{{tag}}</span>
                </div>
                <div class="mov-action-box">
                    <div class="ticket-left">
                        剩余<span>{{movie.ticketstock}}</span>张
                    </div>
                    <a class="btn-buy" href="javascript:void(0)" (click) = "checkLogin(i)">购票</a>
                </div>
            </div>
    `,
    styles:[`
.wrapper-content{
	margin: 0.12rem 0.20rem;
	padding: 0.2rem 0.22rem 0.20rem 0.18rem;
	background: #fff;
    box-shadow: 0px 4px 8px #c4c4c4;
    font-size:0;
    display:flex;
}
.wrapper-content >div{
    display: inline-block;
    height:1.9rem;
}
.wrapper-content .mov-img-box{
    width:1.26rem;
}
.wrapper-content .mov-img-box .mov-img{
    height:1.9rem;
    width:1.26rem;
}
.wrapper-content .mov-description-box{
    width:45%;
    font-size:0.3rem;
    margin:0 0.1rem 0 0.1rem;
    flex:1;
}
.wrapper-content .mov-description-box .mov-title{
    font-size:0.28rem;
    line-height:0.5rem !important;
    margin:0 0 0 0.1rem;
}
.wrapper-content .mov-description-box .mov-short-des,
.wrapper-content .mov-description-box .mov-time{
    font-size:0.25rem;
    color:#999;
    margin: 0.15rem 0 0.15rem 0.1rem;
}
.wrapper-content .mov-description-box .mov-cat{
    background:#FFC750;
    border-radius:0.03rem;
    font-size:0.2rem;
    color:#fff;
    width: 0.60rem;
    height: 0.33rem;
    line-height: 0.33rem;
    display: inline-block;
    text-align: center;
    margin-right:0.06rem;
}
.wrapper-content .mov-description-box span:nth-child(4){
    margin-left:0.1rem;
}
.wrapper-content .mov-action-box{
    width:25%;
    font-size:0.3rem;
    position:relative;
}
.wrapper-content .mov-action-box .ticket-left{
    font-size: 0.2rem;
    color: #999;
    text-align: right;
}
.wrapper-content .mov-action-box .ticket-left span{
    color:#FFD062;
    font-size:0.35rem;
    margin:0 0.1rem 0 0.1rem;
}
.wrapper-content .mov-action-box .btn-buy{
    display: inline-block;
    position: absolute;
    bottom: 0;
    right: 0;
    border: 1px solid;
    border: 1px solid #e54847;
    color: #e54847;
    font-size: 0.28rem;
    width: 1.2rem;
    line-height: 0.6rem;
    height: 0.6rem;
    text-align: center;
    border-radius: 0.1rem;
}

    `],
})

export class MovielistComponent implements OnInit, OnDestroy{
    errorMessage:string;
    movies: Movie[] = null;
    timer: any;
    timerInterval: number = 3000;

    constructor(private movieService:MovieService,
                private checkLoginService: CheckLoginService,
                private router: Router) {
    }

    ngOnInit() {
        this.getMovies();
    }

    ngOnDestroy(){
        clearInterval(this.timer);
    }

    private getMovies() {
        this.movieService.getMovies()
            .subscribe(
                movies => {
                    this.movies = movies;
                    this.refreshTicketStock();
                },
                error => this.errorMessage = <any>error
            );
    }

    private refreshTicketStock(){
        let _self = this;
        this.timer = setInterval(this.refreshTicketStockOnce.bind(this,_self),_self.timerInterval);
    }

    private refreshTicketStockOnce(_self){
        _self.movieService.getTicketStock()
                          .subscribe(
                              ticketStock => {
                                  _self.changeStockOnTemplate(ticketStock);
                              },
                              error => this.errorMessage = <any>error
                          )
    }

    private changeStockOnTemplate(newStockArr){
        this.movies.forEach(
            (movie,index) => {
                movie.ticketstock = newStockArr[index]['ticketstock'];
            }
        );
    }

    private buyTicket(movieid){
        this.movieService.buyTicket(movieid).subscribe(
            (resCode) => {
                console.log(resCode);
                //Do something;
            },
            error => this.errorMessage = <any>error
        )
    }

    checkLogin(index){
        this.checkLoginService.checkLogin()
            .subscribe(
                resCode => {
                    if ( resCode == 40001 ) this.go('login');
                    else if ( resCode == 40005 ) this.go('userprofile');
                    else if ( resCode == 0 ) this.buyTicket(this.movies[index]['id']);
                },
                error => this.errorMessage = <any>error
            );
    }

    go(des) {
        let _self = this;
        _self.router.navigate(['./'+des]);
    }
}
