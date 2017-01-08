import { Component,Input } from '@angular/core';

@Component({
    selector: 'my-submitbtn',
    template:`
    <a class="btn-lg-yellow" href="javascript:void(0)" (click)="submit">{{text}}</a>
    `,
    styles:[`
    .btn-lg-yellow {
	display: block;
	text-align: center;
	background:#FFC750;
	font-size: 0.30rem;
	line-height: 0.8rem;
	height: 0.8rem;
	border-radius: 0.1rem;
	border: 1px solid #FFC750;
	margin: 0.3rem 0.2rem auto 0.2rem;
	color: #000;
    }
    `]

})

export class SubmitbtnComponent{
    @Input() text: string;
    @Input() data: any;

    submit(){
        let _self = this;

        console.log('Submit fired');
        console.log(_self.data);
    }
}