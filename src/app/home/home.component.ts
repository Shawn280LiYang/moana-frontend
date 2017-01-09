import {Component, OnInit} from '@angular/core';
import {FooterService} from "../service/footer.service";

@Component({
  selector: 'my-home',
  template: `
<header>
    <ul>
        <li>Moana Ticket Rush<i class="logo-chick"></i></li>
    </ul>
</header>
<article>
    <section>
        <my-carousel></my-carousel>
    </section>
    <!-- wrapper content -->
    <section>
        <div class="wrapper-box" style="padding-bottom: 1.10rem;">
            <my-movielist></my-movielist>
        </div>
    </section>
</article>
  `,
})
export class HomeComponent implements OnInit {

  tab: number = 0;

  constructor(private footerService: FooterService){}

  ngOnInit(){
    this.footerService.changeTab(this.tab);
  }
}
