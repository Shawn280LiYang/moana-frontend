import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-app', // <my-app></my-app>
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
 
  ngOnInit() {
    console.log('Root component');
  }
}
