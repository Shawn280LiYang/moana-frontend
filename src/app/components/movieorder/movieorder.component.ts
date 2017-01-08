import {Component, Input, OnInit } from '@angular/core';
@Component({
    selector:'my-movieorder',
    template:`
                 
                <section>
                    <div class="wrapper-ticket" *ngFor="let order of orders">
                        <div class="mov-img-box">
                            <img class="mov-img" src="{{order.movieimgurl}}">
                        </div>
                        <div class="mov-info-box">
                            <p class="mov-title">{{order.moviename}}</p>
                            <p class="mov-time">放映时间:<span>{{order.movieshowtime}}</span></p>
                            <p class="mov-buy-time">购票时间:<span>{{order.createtime}}</span></p>
                        </div>
                        <div class="mov-action-box">
                            <div class="ticket-quant">1张</div>
                            <a class="btn-return" [class.disabled] = "btnState === 'disabled'" href="javascript:void(0)">退票</a>
                        </div>
                    </div>
                 </section>
    `,
    styles:[`
.wrapper-ticket{
	margin: 0.12rem 0.20rem;
	padding: 0.2rem 0.22rem 0.20rem 0.18rem;
	background: #fff;
	box-shadow: 0px 4px 8px #c4c4c4;
	font-size:0;
	display:flex;
}
.wrapper-ticket >div{
	display: inline-block;
	height:1.5rem;
}
.wrapper-ticket .mov-img-box{
	width:1rem;
}
.wrapper-ticket .mov-img-box .mov-img{
	height:1.5rem;
	width:1rem;
}
.wrapper-ticket .mov-info-box{
	width:45%;
	font-size:0.3rem;
	margin:0 0.1rem 0 0.1rem;
	flex:1;
}
.wrapper-ticket .mov-info-box .mov-title{
	font-size:0.28rem;
	line-height:0.5rem !important;
	margin:0 0 0 0.1rem;
}
.wrapper-ticket .mov-info-box .mov-time,
.wrapper-ticket .mov-info-box .mov-buy-time{
	font-size:0.25rem;
	color:#999;
	margin: 0.15rem 0 0.15rem 0.1rem;
}
.mov-time span,
.mov-buy-time span{
	margin-left:0.1rem;
}
.wrapper-ticket .mov-action-box{
	width:25%;
	font-size:0.3rem;
	position:relative;
}
.wrapper-ticket .mov-action-box .ticket-quant{
	font-size: 0.35rem;
	color:#FFD062;
	text-align: right;
}
.wrapper-ticket .mov-action-box .btn-return{
	display: inline-block;
	position: absolute;
	bottom: 0;
	right: 0;
	border: 1px solid #e54847;
	color: #e54847;
	font-size: 0.28rem;
	width: 1.2rem;
	line-height: 0.6rem;
	height: 0.6rem;
	text-align: center;
	border-radius: 0.1rem;
}
.disabled{
	color:#999 !important;
	border:1px solid #999 !important;
} 
    `]
})

export class MovieorderComponent{
    btnState: string = 'disabled';
    @Input() orders: any;

    
}