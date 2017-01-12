import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class ApiService {
  private dialogSource = new Subject<Object>();
  dialogSource$ = this.dialogSource.asObservable();

  constructor(private http: Http) {

  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  dialog(opt) {
    let config: Object = {
      show: true,
      title: '温馨提示',
      content: '',
      okCb: null,
      okText: '确认',
      cancelCb: null,
      cancelText: '取消'
    };

    if(opt) {
      config['title'] = opt.title ? opt.title : '温馨提示';
      config['content'] = opt.content ? opt.content : ''; 
      config['okCb'] = opt.okCb ? opt.okCb : null; 
      config['okText'] = opt.okText ? opt.okText : '确认'; 
      config['cancelCb'] = opt.cancelCb ? opt.cancelCb : null; 
      config['cancelText'] = opt.cancelText ? opt.cancelText : '取消'; 
    }

    this.dialogSource.next(config);
  }

}
