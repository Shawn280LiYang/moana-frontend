import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {FooterService} from "../../service/footer.service";

@Component({
  selector: 'my-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit{
    tab: number;
    isLogin: boolean;
    errorMessage: any;

  constructor( private router:Router, private footerService: FooterService){
  }

    ngOnInit(){
        this.footerService.tabSource$.subscribe(
            (tab) => {this.tab = tab;}
        )
    }
  
  go(des){
    let _self = this;
    _self.router.navigate(['./' + des]);
  }

}
