import {Component, Input, OnInit, ViewChildren, AfterViewInit, QueryList} from '@angular/core';

@Component({
    selector: 'my-listform',
    template:`
                    <ul class="list-form">
                        <li *ngIf="imgConf" class="user-page-img">
                            <h4>{{imgConf.label}}</h4>
                            <img src="{{imgConf.imgurl}}" alt="" />
                        </li>
                        <form>
                            <!--prevent chrome autofill-->
                            <input style="display:none" type="text" name="fakeusernameremembered"/>
                            <input style="display:none" type="password" name="fakepasswordremembered"/>
                            <!--real input from here-->
                            <my-input *ngFor="let c of config.inputConf;" [input] = "c" #inputData></my-input>
                        </form>
                    </ul>
    `,
    styles:[`
.list-form{
	margin-bottom: 0.12rem;v
	padding-left: 0.30rem;
	background: #fff;
	border-bottom: 1px solid #E5
	border-top: 1px solid #E5E5E5;
}
    `]
})

export class ListformComponent implements OnInit, AfterViewInit{
    @Input() imgConf: any;
    @Input() config: any;
    @ViewChildren('inputData') data: QueryList<any>;
    inputElements :any[];
    queryString: string;

    ngOnInit(){
    }

    ngAfterViewInit(){
        //extract components from QueryList
        this.inputElements = this.data['_results'];
    }

    toggleReadonly(){
        let _self = this;
        this.config['inputConf'].forEach(
            (c,index) => {
                c['isReadonly'] = !c['isReadonly'];
                if( (index == 0 )&& (!c['isReadonly'])) _self.inputElements[index].fireFocus();
            }
        );
    }

    validateAllInputs(){
        let submission = true;
        this.inputElements.forEach(
            (element) => {
                if(!element.validateInput()) submission = false;
            }
        )
        return submission;
    }

   validatePasswordConfirm(){
        let submission = true;

        // TODO 考虑把confirm,还有username ele先取出存成变量
        if(this.getValuesObj()['password'] != this.getValuesObj()['confirm']){
            this.inputElements.forEach(
                (element) => {
                  if(element.input['name'] == 'confirm') element.isInvalid = true;
                }
            )
            submission =false;
        }

        return submission;
    }

    getValuesObj(){
        let _self = this;
        let objArr = [{}];
        objArr = this.inputElements.map(
            (ele) => {
                let arr = [];
                arr = ele.getInputValue();
                return arr;
            }
        );
        return Object.assign.apply(null,objArr);
    }

    getValuesObjExceptPwd(){
        let _self = this;
        let objArr = [{}];
        objArr = this.inputElements.map(
          (ele) => {
            if(ele.input['name']!='password' && ele.input['name']!='confirm') {
                let arr = [];
                arr = ele.getInputValue();
                return arr;
            }
          }
        );
        return Object.assign.apply(null,objArr);
    }

    getPasswordEncrypted(salt){
        // let debug = 1483959796;
        let CryptoJS = window["CryptoJS"];
        let pswd = this.getValuesObj()['password'];
        console.log("timestamp: "+ salt);
        console.log("password: "+ pswd);
        if(pswd){
            console.log(CryptoJS.MD5((CryptoJS.MD5(pswd) + salt).toString()).toString());
            return CryptoJS.MD5((CryptoJS.MD5(pswd) + salt).toString()).toString();
        }
        return false;
    }

    getSignupPasswordEncrypted(){
        let CryptoJS = window["CryptoJS"];
        let pswd = this.getValuesObj()['password'];
        console.log("password: "+ pswd);
        if(pswd){
            return CryptoJS.MD5(pswd).toString();
        }
        return false;
    }

    // replace by getValuesObjExceptPsd
    // 但是取单个valueObject的时候可以用这个
    // getUsernameEntry(){
    //     let _self = this;
    //     let objArr = [];
    //     objArr = this.inputElements.map(
    //         (ele) => {
    //             let arr = [];
    //             arr = ele.getInputValue();
    //             return arr;
    //         }
    //     );
    //     return objArr.filter(this.filterByUsername)[0];
    // }
    //
    // private filterByUsername(element){
    //     return Object.getOwnPropertyNames(element)[0] == "username";
    // }

    getUrlParams(obj){
        let url = Object.keys(obj).map(function(k) {
            return encodeURIComponent(k) + '=' + encodeURIComponent(obj[k])
        }).join('&');
        return url;
    }
}