import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class FooterService{

    // Observable string sources
    private tabSource = new Subject<number>();

    // Observable streams
    tabSource$ = this.tabSource.asObservable();

    changeTab(tab: number){
        this.tabSource.next(tab);
    }

};