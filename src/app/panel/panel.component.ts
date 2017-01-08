import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserpanelService} from "../service/userpanel.service";
import {User} from "../shared/user";

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
                    <h5>{{userData.username}}</h5>
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
            </article>
        </div>
    </section>
</article>
    `
})
export class PanelComponent implements OnInit {
    
    navContent: string[] = ['我的电影票'];
    userData: User = null;
    orderList: any = null;
    errorMessage: any;

  constructor( private router: Router, private userpanelService: UserpanelService) {
    // Do stuff
  }

  ngOnInit(){
    this.getUserData();
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
}
