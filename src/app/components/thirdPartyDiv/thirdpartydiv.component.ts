import { Component, OnInit} from '@angular/core';
import { LoginService } from "../../service/login.service";

@Component({
    selector: 'my-thirdpartydiv',
    template: `
    <div class="alt-login-wrapper">
         <p>- 其他登录方式 -</p>
         <div class="logo-wrapper">
            <a class="logo-circle wx" href="{{portalMap['wx']}}" ></a>
            <a class="logo-circle wb" href="{{portalMap['wb']}}" ></a>
         </div>
    </div>
    `,
    styles:[`
.alt-login-wrapper{
	position: absolute;
	bottom: 1rem;
	background: #fff;
	border-top: 1px solid #e5e5e5;
	display: block;
	width: 100%;
}
.alt-login-wrapper >p{
	width: 100%;
	text-align: center;
	color: #a9a9a9;
	line-height: 0.6rem;
	margin: 0.3rem auto;
	font-size: 0.25rem;
}
.logo-wrapper{
	text-align:center;
	margin-bottom: 0.3rem;
}
.logo-circle{
	width:1rem;
	height:1rem;
	border-radius:0.5rem;
	border:1px solid #a9a9a9;
	display:inline-block;
	margin-left:0.2rem;
	background-size:0.5rem auto !important;
}
.logo-wrapper div:first-child{
	margin-left:0;
}
.wx{
	background:url('img/weixin_logo.png') no-repeat center;
}
.wb{
	background:url('img/weibo_icon.png') no-repeat center;
}
    
    `],
})

export class ThirdPartyDivComponent implements OnInit{
    portalMap: any ={
        "wb": 'https://api.weibo.com/oauth2/authorize?client_id='
              +'|1appid|'
              +'&redirect_uri='
              +'|3redirectUrl|'
              + '&display=mobile&response_type=code',
        "wx": 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='
              + '|1appid|'
              + '&redirect_uri='
              + '|3redirectUrl|'
              + '&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect',
    };

    redirectDes: string = "thirdpartylogin";
    errorMessage: string;

    constructor(private loginService: LoginService){}

    ngOnInit(){
        this.initHrefs();
    }

    private initHrefs(){
        for(let key in this.portalMap){
            this.getPortalHref(key);
        }
        // console.log(this.portalMap);
    }

    private getPortalHref(portal){
        let arr = this.portalMap[portal].split('|');
        this.loginService.getAppid(portal)
                         .subscribe(
                             (appid) => {
                                 arr[1] = appid;
                                 arr[3] = this.getRedirectUrl(portal);
                                 let href = arr.join('');
                                 this.portalMap[portal] = href;
                             },
                             error => this.errorMessage = <any>error
                         );
    }

    private getRedirectUrl(portal) {
        return encodeURIComponent(
            window.location.origin
            + '/java/cat/'
            + portal
            +'Login?backUrl='
            + encodeURIComponent(window.location.origin + '/index.html#/' + this.redirectDes)
        );
    }

}