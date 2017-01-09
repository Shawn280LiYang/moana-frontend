import {Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { Formconf } from "../shared/formconf";
import {ProfileService} from "../service/profile.service";
import {FooterService} from "../service/footer.service";
import {CheckLoginService} from "../service/checklogin.service";
@Component({
    selector: 'my-profile',
    template: `
    <header>
    <ul>
        <li>用户设置</li>
    </ul>
</header>
<article style="padding-bottom: 1.00rem;">
    <section>
        <div class="brown-box" style="margin-top: .3rem;">
            <my-listform [config] = "profileConf" [imgConf] = "imgConf" #profileForm></my-listform>
            <div *ngIf="notify" class="notification">亲~~修改发生了问题,请重试哦~~</div>
            <a *ngIf = "!isModifyMode" class="btn-lg-yellow" href="javascript:void(0)" (click)="fireModify()">修改</a>
            <a *ngIf = "isModifyMode" class="btn-lg-red" href="javascript:void(0)" (click)="submit()">确认</a>
        </div>
    </section>
</article>
    
    `,
    styles:[`
    .user-info p{
        width: 4rem;
        text-align:right;
    }
    .user-input{
        padding: 0 0.30rem;
        text-align: right; 
        font-size: 0.30rem;
        color: #333;
        width: 2.70rem;
        height: 0.93rem;
        background: #F2F2F2;
        border: 1px solid #E5E5E5;
    }
    .new-align{
        line-height: 0.93rem;
    }
    .user-email{
        width: 4.3rem !important;
    }
    .notification{
        text-align:center;
        height:0.6rem;
        line-height:0.6rem;
    }
    
    `],
})

export class ProfileComponent implements OnInit{

    @ViewChild('profileForm') form;
    profileConf: Formconf = new Formconf('profile');
    imgConf: any = {"imgurl":'',"label":"头像"};
    isModifyMode: boolean = false;
    notify: boolean = false;
    resCode: string;
    errorMessage: string;
    tab:number = 2;


    constructor( private router: Router,
                 private profileService: ProfileService,
                 private footerService: FooterService,
                 private checkLoginService: CheckLoginService) {
        // Do stuff
    }

    ngOnInit() {
        this.footerService.changeTab(this.tab);
        this.checkLogin();

    }

    fireModify(){
        this.notify = false;
        this.form.toggleReadonly();
        this.isModifyMode = true;
    }

    stopModify(){
        this.isModifyMode = false;
        this.form.toggleReadonly();
    }

    //TODO 在此调用save的接口,如果responseCode显示成功那么变回"修改"
    submit(){
        let _form = this.form;

        //if validation passed, submit
        if ( _form.validateAllInputs() ) {
            //gather post data
            let profile = _form.getUrlParams(_form.getValuesObj());
            //update db using profile service
            this.profileService.updateProfile(profile)
                .subscribe(
                    resCode => {
                        this.resCode = resCode;
                        if(resCode == 0) this.stopModify();
                        else {
                            this.notify = true;
                            this.stopModify();
                        }
                    },
                    error => {this.errorMessage = <any>error}
                );
        }else{
            this.stopModify();
        }

    }

    checkLogin(){
        this.checkLoginService.checkLogin()
            .subscribe(
                resCode => {
                    let isLogin = (resCode == '0');
                    if(!isLogin){
                        this.go('login');
                    }else{
                        this.getProfile();
                    }
                },
                error => this.errorMessage = <any>error
            );
    }
    
    getProfile(){
        this.profileService.getProfile().subscribe(
            (data) => {
                if(data) {
                    this.imgConf['imgurl'] = data['photo'];
                    this.profileConf.inputConf.forEach(
                        (element) => {
                            if (element['name'] === 'nickname') element['value'] = data['nickname'];
                            else if (element['name'] === 'email') element['value'] = data['email'];
                        }
                    )
                }
            },
            error => this.errorMessage = <any>error
        )
    }

    go(des) {
        let _self = this;
        _self.router.navigate(['./'+des]);
    }
}
