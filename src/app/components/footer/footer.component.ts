import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {CheckLoginService} from "../../service/checklogin.service";

@Component({
  selector: 'my-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  tab = 0;
    isLogin: boolean;
    errorMessage: any;

  constructor( private router:Router, private checkLoginService: CheckLoginService){
  }
  
  go(des){
    let _self = this;
    _self.router.navigate(['./' + des]);
  }

  setNgo(tab,des){
    this.go(des);
    this.tab = tab;
  }
  
  checkLogin(){
    let _self = this;
    this.checkLoginService.checkLogin()
        .subscribe(
            resCode => {
              _self.isLogin = !resCode;
              console.log(resCode + "|" +this.isLogin);
                if(this.isLogin){
                    this.setNgo(1,'userpanel');
                }else{
                    this.setNgo(2,'login');
                }
            },
            error => this.errorMessage = <any>error
        );
  }
}
