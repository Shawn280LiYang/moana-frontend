import {Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CheckLoginService} from "../service/checklogin.service";

@Component({
    selector: 'my-thirdp',
    template:`
    <h3>跳转中...</h3>
    `
})

export class ThirdPartyPanelComponent implements OnInit{
    errorMessage: string;

    constructor(private router: Router, private checkLoginService: CheckLoginService){}

    ngOnInit(){
        this.checkLogin();
    }

    checkLogin(){
        this.checkLoginService.checkLogin()
            .subscribe(
                resCode => {
                    if (resCode == 0 ) this.go('userpanel');
                    else if (resCode == 40005) this.go('userprofile');
                    else this.go('login');
                },
                error => this.errorMessage = <any>error
            );
    }
    go(des) {
        let _self = this;
        _self.router.navigate(['./'+des]);
    }
}