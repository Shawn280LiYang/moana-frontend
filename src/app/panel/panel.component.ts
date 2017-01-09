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
                    console.log('in component');
                    console.log(this.userData);
                },
                error => this.errorMessage = <any>error
            );
    }

    checkLogin(){
        this.checkLoginService.checkLogin()
            .subscribe(
                resCode => {
                    let isLogin = (resCode == '0');
                    if(isLogin){
                        this.getUserData();
                    }else{
                        this.go('login');
                    }
                },
                error => this.errorMessage = <any>error
            );
    }
}
