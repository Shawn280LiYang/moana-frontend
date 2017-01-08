import {Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {Formconf} from "../shared/formconf";
import {LoginService} from "../service/login.service";
import {Router} from "@angular/router";

@Component({
    selector:'my-login',
    templateUrl: './login.component.html',
})

export class LoginComponent implements OnInit, AfterViewInit{
    wb: string;
    wx: string;
    errorMessage: string;
    loginRtCode: number;
    ticket: number;
    
    @ViewChild('loginForm') loginForm;

    constructor(private loginService:LoginService, private router:Router){}
    
    navContent: string[] = ['账号密码登录','邮箱注册'];
    tab: number = 0;

    loginConf: any = new Formconf('login');
    signupConf: any = new Formconf('signup');
    btnText: string[] = ["登录","注册"];

    ngOnInit(){
    }

    ngAfterViewInit(){
        this.wb = 'https://api.weibo.com/oauth2/authorize?client_id=1724529937&redirect_uri='
            + this.getWbRedirectUrl() + '&display=mobile&response_type=code';

        this.wx = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx39c79c1bbec2a29b&redirect_uri='
            + this.getWxRedirectUrl() + '&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect';
    }

    getWbRedirectUrl() {
        return encodeURIComponent(
            // window.location.origin + '/java/moana/wbLogin?backUrl='
            // + encodeURIComponent(window.location + '/index.html#/userpanel')
            window.location.origin + '/java/moana/wbLogin'
        );
    }

    getWxRedirectUrl() {
        return encodeURIComponent(
            // window.location.origin + '/java/moana/wbLogin?backUrl='
            // + encodeURIComponent(window.location + '/index.html#/userpanel')
            window.location.origin + '/java/moana/wxLogin'
        );
    }

    isTab(tab){
        return this.tab === tab;
    }

    catchTabChange(tab: number){
        console.log('catch tab change : '+ tab);
        this.tab = tab;
    }

    testFunc(){
        // let c = window.CryptoJS.MD5('password');
        // declare var CryptoJS;
        // console.log(CryptoJS.MD5('password'));
        console.log(this.loginForm.getPasswordEncrypted());
    }

    loginSubmit(){
        let _self = this;
        let _usernameKV = this.loginForm.getUsernameEntry();
        let usernameUrlStr = this.loginForm.getUrlParams(_usernameKV);

        this.loginService.getLoginTicket(usernameUrlStr)
                         .subscribe(
                             ticket => {
                                 this.ticket = ticket;
                                 if(this.ticket != 10001) {
                                     let pswd = _self.loginForm.getPasswordEncrypted(this.ticket);
                                     let loginParam = usernameUrlStr + "&" + "password="+pswd;
                                     this.loginService.loginUser(loginParam)
                                                      .subscribe(
                                                          code => {
                                                              this.loginRtCode = code;
                                                              if(this.loginRtCode == 0) this.router.navigate(['./userpanel']);
                                                              console.log("第二层拿登录态: "+ this.loginRtCode);
                                                          },
                                                          error => {this.errorMessage = <any>error}

                                         );
                                 } else {
                                     this.loginRtCode = -1;
                                     console.log("如果拿ticket失败的通路" + this.loginRtCode);
                                 }
                             },
                             error =>  {this.errorMessage = <any>error}
        
                         );
    }
    
}