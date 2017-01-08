import {Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector:'my-tabnav',
    template:`
            <ul class="list-mycon-nav box_box">
                <li *ngFor="let c of navContent; let i = index" [class.active]="tab === i" (click)="setTab(i)"><span>{{c}}</span></li>
            </ul>
    `,
    styles:[`
.list-mycon-nav{
	background: #F9F9F9;
	padding: 0 0.12rem;
}
.list-mycon-nav li{
	font-size: 0.28rem;
	color: #666;
	margin: 0 0.30rem;
	text-align: center;  
	-webkit-box-flex:1;
    -moz-box-flex: 1; 
    -ms-flex: 1; 
}
.list-mycon-nav li span{
    display: block;
	padding:  0.28rem 0 0.22rem;
}
.list-mycon-nav li.active span{
	border-bottom: 6px solid #FFC750;
	color: #333;
	font-weight: bold;
}
    `]
})

export class TabnavComponent{
    @Input() navContent: string[];
    @Output() onTabChanged = new EventEmitter<number>();

    tab: number = 0;

    setTab(tab){
        if(tab === this.tab) return;
        this.tab = tab;
        console.log('set tab'+tab);
        this.onTabChanged.emit(tab);
    }
}