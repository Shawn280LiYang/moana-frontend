import {Component, OnInit, ViewChild } from '@angular/core';
import {Formconf} from "../shared/formconf";
import {LoginService} from "../service/login.service";
import {Router} from "@angular/router";
import {FooterService} from "../service/footer.service";
import {CheckLoginService} from "../service/checklogin.service";

@Component({
    selector:'my-login',
    templateUrl: './login.component.html',
})

export class LoginComponent implements OnInit {
    wb: string;
    wx: string;
    errorMessage: string;
    loginRtCode: number;
    signupRtCode: number;
    ticket: number;
    navContent: string[] = ['账号密码登录','注册账号'];
    tab: number = 0;
    loginConf: any = new Formconf('login');
    signupConf: any = new Formconf('signup');
    btnText: string[] = ["登录","注册"];
    footerTab: number = 2;

    
    @ViewChild('loginForm') loginForm;
    @ViewChild('signupForm') signupForm;

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

    
    isTab(tab){
        return this.tab === tab;
    }

    catchTabChange(tab: number){
        console.log('catch tab change : '+ tab);
        this.tab = tab;
    }

    loginSubmit() {
        //gather data from login form
        let _form = this.loginForm;

        if (_form.validateAllInputs()) {
            let usernameUrlStr = _form.getUrlParams(_form.getValuesObjExceptPwd());
            this.goLogin(usernameUrlStr);
        }else{
            console.log('validateAllInputs 失败');
        }
    }

    goLogin(usernameUrlStr){
        let _form = this.loginForm;
        //calling get ticket to check whether user exists
        this.loginService.getLoginTicket(usernameUrlStr)
                         .subscribe(
                             ticket => {
                                 this.ticket = ticket;
                                 //if ticket checks
                                 if(this.ticket != 10001) {
                                     let pswd = _form.getPasswordEncrypted(this.ticket);
                                     let loginParam = usernameUrlStr + "&password="+pswd;
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
  
    signupSubmit(){
        let _form = this.signupForm;

        if( _form.validateAllInputs() ){
            if( _form.validatePasswordConfirm() ){
                let encryptedPwd = _form.getSignupPasswordEncrypted();
                let signupUrl = _form.getUrlParams(_form.getValuesObjExceptPwd()) + "&password="+encryptedPwd;
                this.loginService.signupUser(signupUrl)
                    .subscribe(
                        code => {
                            this.signupRtCode = code;
                            // 0 => success
                            if(this.signupRtCode == 0) this.router.navigate(['./userpanel']);
                            console.log("responseCode: "+ this.signupRtCode);
                        },
                        error => {this.errorMessage = <any>error}
                    );
            }else{
                console.log('两次输入密码不相同,请确认');
            }
        }else{
            console.log('validateAllInputs 失败');
        }
    }

    go(des) {
        let _self = this;
        _self.router.navigate(['./'+des]);
    }
}