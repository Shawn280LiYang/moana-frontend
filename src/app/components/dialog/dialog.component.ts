import { Component } from '@angular/core';

import {ApiService} from "../../shared/api.service";

@Component({
  selector: 'my-dialog',
  templateUrl: './dialog.component.html'
})
export class DialogComponent {

  config: Object = {
    show: false,
  };

  constructor(private api: ApiService) {
    api.dialogSource$.subscribe( (dialogSource) => {
      this.config = dialogSource;
    });
    // Do something with api
  }

  okCb() {
    if( this.config['okCb'] && typeof(this.config['okCb'] == 'function') ) {
      this.config['okCb']();
    }
    this.config['show'] = false;
  }

  cancelCb() {
    if( this.config['cancelCb'] && typeof(this.config['cancelCb'] == 'function') ) {
      this.config['cancelCb']();
    }
    this.config['show'] = false;
  }
}
