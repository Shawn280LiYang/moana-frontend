import { Component, OnInit, OnDestroy, HostListener, ViewChild, Renderer } from '@angular/core';

@Component({
  selector: 'my-carousel',
  template: `
<div class="carousel">
    <i class="car-next" (click)="toNext()"></i>
    <ul class="slides" #slides>
        <li *ngFor="let image of images; let idx = index;" 
            [class.active]="idx==active" 
            [class.next]="idx==next" 
            [class.prev]="idx==prev"
            (touchstart)="onDragStart($event)"
            (touchmove)="onDragMove($event)"
            (touchcancel)="onDragEnd($event)"
            (touchend)="onDragEnd($event)"
            >
            <a href="javascript:;"><img src="{{image.url}}" alt="" width="100%"></a>
        </li>
    </ul>
    <ul class="list-icon" *ngIf="showDots">
        <li *ngFor="let image of images; let idx = index;" [class.active]="idx==active"></li>
    </ul>
    <i class="car-prev" (click)="toPrev()"></i>
</div>
  `,
  styles: [`
.carousel{
    overflow:hidden;
    width:100%;
    position: relative;
    margin: 0.16rem 0;
    height: 2.25rem;
}
.slides{
    list-style:none;
    position:relative;
    width:100%; /* Number of panes * 100% */
}
.slides .active {
    display: inline-block;
    transform: translateX(0);
}
.slides .next {
    display: inline-block;
    transform: translateX(100%);
}
.slides .prev {
    display: inline-block;
    transform: translateX(-100%);
}
.slides > li{
    transition: 0.3s;
    position:absolute;
    float:left;
    height: 2.25rem;
    width: 100%;
    display: none;
}
.carousel img{
    position:relative;
    display:block;
    width:100%;
    max-width:100%;
}
.carousel h2{
    margin-bottom: 0;
    font-size:1em;
    padding:1.5em 0.5em 1.5em 0.5em;
    position:absolute;
    right:0px;
    bottom:0px;
    left:0px;
    text-align:center;
    color:#fff;
    background-color:rgba(0,0,0,0.75);
    text-transform: uppercase;
}
  `],
})

export class CarouselComponent {
	public images = IMAGES;
    active: number = 0;
    prev: number = IMAGES.length - 1;
    next: number = 1;
    showDots: boolean = true;

    dragging: boolean = false;
    touchmoveListener: any;
    touchendListener: any;
    touchcancelListener: any;

    dragStartPoint: number;
    curPoint: number;

    looper;

    @ViewChild('slides') slides;

    constructor(private renderer: Renderer) {}

    ngOnInit() {
        if(this.images.length < 1) {
            this.images = [
                { "url": "img/banner1.jpg" },
                { "url": "img/banner2.jpg" },
                { "url": "img/banner3.jpg" },
            ]
        }
        if(this.images.length < 3) {
            this.showDots = false;
            this.images = this.images.concat(this.images).concat(this.images);
        }
        this.startLoop();
    }

    startLoop() {
        this.looper = setInterval(()=>{
            this.active = (this.active + 1) % IMAGES.length;
            this.prev = this.active == 0 ? this.images.length - 1 : this.active - 1;
            this.next = (this.active + 1) % IMAGES.length;
        }, 3000)
    }

    onDragStart(event) {
        event.preventDefault();
        event.stopPropagation();
        clearInterval(this.looper);
        this.dragStartPoint = event.touches[0].clientX;
        this.curPoint = event.touches[0].clientX;
        let _target = this.slides.nativeElement.children;
        _target[this.active].style.transition = '0s';
        _target[this.prev].style.transition = '0s';
        _target[this.next].style.transition = '0s';
    }

    onDragMove(event) {
        event.preventDefault();
        event.stopPropagation();
        this.curPoint = event.touches[0].clientX;
        let _target = this.slides.nativeElement.children;
        _target[this.active].style.transform = 'translateX(' + (this.curPoint - this.dragStartPoint) + 'px)';
        _target[this.prev].style.transform = 'translateX(' + (this.curPoint - this.dragStartPoint - this.slides.nativeElement.clientWidth) + 'px)';
        _target[this.next].style.transform = 'translateX(' + (this.slides.nativeElement.clientWidth + this.curPoint - this.dragStartPoint) + 'px)';
    }

    onDragEnd(event) {
        event.stopPropagation();
        this.startLoop();
        let _target = this.slides.nativeElement.children;
        if(this.curPoint - this.dragStartPoint > 100) {
            this.toNext();
        }
        else if(this.curPoint - this.dragStartPoint < -100) {
            this.toPrev();
        }
        for(let i in _target) {
            _target[i].style.transition = '';
            _target[i].style.transform = '';
        }
    }

    toNext() {
        this.next = this.active;
        this.active = this.prev;
        this.prev = this.prev == 0 ? this.images.length - 1 : this.prev - 1;
    }

    toPrev() {
        this.prev = this.active;
        this.active = this.next;
        this.next = (this.next + 1) % IMAGES.length;
    }

    ngOnDestroy() {
        clearInterval(this.looper);

        if(this.touchmoveListener){
            this.touchmoveListener();
        }

        if(this.touchendListener){
            this.touchendListener();
        }

        if(this.touchcancelListener){
            this.touchcancelListener();
        }
    }
}

//IMAGES array implementing Image interface
var IMAGES: Object[] = [
	{ "url": "img/banner1.jpg" },
	{ "url": "img/banner2.jpg" },
	{ "url": "img/banner3.jpg" },
];