import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {UserpanelService} from "../service/userpanel.service";
import {User} from "../shared/user";
import {CheckLoginService} from "../service/checklogin.service";
import {FooterService} from "../service/footer.service";

@Component({
  selector: 'my-panel',
    template:`
    <article style="/* height: 1%; */" *ngIf = "userData">
    <!-- banner -->
    <section>
        <div class="wrapper-mybanner" (click)="go('userprofile')">
            <div class="content-myheader box_box">
                <img src="{{userData.photo}}" alt="" width="100%">
                <i class="icon-righte user"></i>
                <div class="content-myname">
                    <h5>{{userData.nickname}}</h5>
                </div>
            </div>
        </div>
    </section>
    <!-- wrapper content -->
    <section>
        <div class="wrapper-box" style="padding-bottom: 1.10rem;">
            <my-tabnav [navContent]="navContent"></my-tabnav>
            <article>
                    <my-movieorder *ngIf="orderList" [orders] = "orderList"></my-movieorder>
                    <div *ngIf="!orderList" class="notification">亲! 你暂时没有购买的电影票哦~~</div>
            </article>
        </div>
    </section>
</article>
    `,
    styles:[`
    .wrapper-mybanner{
	position: relative;
	margin-top: -0.28rem;
	padding: 0.78rem 0.30rem 0;
    width: 100%;
    height: 2.97rem;
    background: url("img/mybanner.png") no-repeat center;
    background-size: contain;
}
.content-myheader{
	margin-top: 0.23rem;
}

.content-myheader img{
	display: inline-block;
	width: 1.32rem;
	height: 1.32rem;
	border-radius: 50%;
	border: 10px solid rgba(255,255,255,0.2);
}
.content-myname{
	margin-left: 0.42rem;
	font-size: 0.28rem;
	color: #050505;
	line-height: 0.4rem;
}
.content-myname h5{
	font-size: 0.36rem;
	color: #fff;
	line-height: 1.12rem;
	margin-bottom: 0.20rem;
}
.content-myname p{
	margin-top: 0.10rem; 
}
    
.notification{
    border: 1px solid;
    border-radius: 0.05rem;
    color: #e54847;
    height: 0.60rem;
    line-height: 0.60rem;
    text-align: center;
    margin: 0.3rem 0.3rem;
}
    `],
})
export class PanelComponent implements OnInit {
    
    navContent: string[] = ['我的电影票'];
    userData: User = null;
    orderList: any = null;
    errorMessage: any;
    tab: number = 2;

  constructor( private router: Router,
               private userpanelService: UserpanelService,
               private checkLoginService: CheckLoginService,
               private footerService: FooterService) {
    // Do stuff
  }

  ngOnInit(){
    /* check user login status
     * if session not expired, loading user panel
     * if session expired/not logged in, loading login/register page
     */
      this.footerService.changeTab(this.tab);

      this.checkLogin();
  }

  go(des) {
    let _self = this;
    _self.router.navigate(['./'+des]);
  }

    getUserData(){
        let _self = this;

        this.userpanelService.getUserData()
            .subscribe(
                userData => {
                    _self.userData = userData;
                    _self.orderList = userData['orderDtoList'];
                },
                error => this.errorMessage = <any>error
            );
    }

    checkLogin(){
        this.checkLoginService.checkLogin()
            .subscribe(
                resCode => {
                    if (resCode == 0 ) this.getUserData();
                    else if (resCode == 40005) this.go('userprofile');
                    else this.go('login');
                },
                error => this.errorMessage = <any>error
            );
    }
}
