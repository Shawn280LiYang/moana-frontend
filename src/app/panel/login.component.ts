import {Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {Formconf} from "../shared/formconf";
import {LoginService} from "../service/login.service";
import {Router} from "@angular/router";
import {FooterService} from "../service/footer.service";
import {CheckLoginService} from "../service/checklogin.service";

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
    navContent: string[] = ['账号密码登录','邮箱注册'];
    tab: number = 0;
    loginConf: any = new Formconf('login');
    signupConf: any = new Formconf('signup');
    btnText: string[] = ["登录","注册"];
    footerTab: number = 2;

    
    @ViewChild('loginForm') loginForm;

    constructor(private loginService:LoginService,
                private router:Router,
                private footerService: FooterService,
                private checkLoginService: CheckLoginService){}
    
    ngOnInit(){
        this.footerService.changeTab(this.footerTab);
        this.checkLogin();
    }

    checkLogin(){
        this.checkLoginService.checkLogin()
            .subscribe(
                resCode => {
                    let isLogin = (resCode == '0');
                    if(isLogin){
                        this.go('userpanel');
                    }
                },
                error => this.errorMessage = <any>error
            );
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

    loginSubmit(){
        //gather data from login form
        let _form = this.loginForm;
        let usernameUrlStr = _form.getUrlParams(_form.getUsernameEntry());

        //calling get ticket to check whether user exists
        this.loginService.getLoginTicket(usernameUrlStr)
                         .subscribe(
                             ticket => {
                                 this.ticket = ticket;
                                 //if ticket checks
                                 if(this.ticket != 10001) {
                                     let pswd = _form.getPasswordEncrypted(this.ticket);
                                     let loginParam = usernameUrlStr + "&" + "password="+pswd;
                                     //try log in user
                                     this.loginUser(loginParam);
                                 } else {
                                     this.loginRtCode = -1;
                                     console.log("如果拿ticket失败的通路" + this.loginRtCode);
                                 }
                             },
                             error =>  {this.errorMessage = <any>error}
        
                         );
    }

    loginUser(loginParam){
        this.loginService.loginUser(loginParam)
            .subscribe(
                code => {
                    this.loginRtCode = code;
                    // 0 => success
                    if(this.loginRtCode == 0) this.router.navigate(['./userpanel']);
                    console.log("第二层拿登录态: "+ this.loginRtCode);
                },
                error => {this.errorMessage = <any>error}
            );
    }

    go(des) {
        let _self = this;
        _self.router.navigate(['./'+des]);
    }
}